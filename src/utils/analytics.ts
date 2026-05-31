import { caffeineByType } from "@/constants/coffee";
import type {
  BeanCollectionItem,
  CoffeeDNA,
  CoffeeEntry,
  CoffeeType,
  WrappedReport,
  WorkSession,
} from "@/src/types/brew";

const dayMs = 24 * 60 * 60 * 1000;

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export const estimateCaffeine = (type: CoffeeType, override?: number) => override ?? caffeineByType[type] ?? 120;

export const sameCalendarDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const isInLastDays = (dateIso: string, days: number) => {
  const now = new Date();
  const date = new Date(dateIso);
  return now.getTime() - date.getTime() <= days * dayMs;
};

const countBy = <T,>(items: T[], getKey: (item: T) => string) =>
  items.reduce<Record<string, number>>((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

const topKey = (counts: Record<string, number>, fallback = "Unknown") =>
  Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? fallback;

export const getCaffeineSummary = (entries: CoffeeEntry[], dailyLimitMg = 400) => {
  const today = new Date();
  const todayMg = entries
    .filter((entry) => sameCalendarDay(new Date(entry.drankAt), today))
    .reduce((sum, entry) => sum + entry.caffeineMg, 0);
  const weekMg = entries.filter((entry) => isInLastDays(entry.drankAt, 7)).reduce((sum, entry) => sum + entry.caffeineMg, 0);
  const monthMg = entries.filter((entry) => isInLastDays(entry.drankAt, 30)).reduce((sum, entry) => sum + entry.caffeineMg, 0);
  const latestLateCoffee = entries.find((entry) => new Date(entry.drankAt).getHours() >= 17);

  return {
    todayMg,
    weekMg,
    monthMg,
    safeRangeLabel: `0-${dailyLimitMg} mg`,
    isOverLimit: todayMg > dailyLimitMg,
    sleepImpact:
      entries.length === 0
        ? "Log your first coffee to start tracking sleep impact."
        : latestLateCoffee !== undefined
        ? "Based on your habits, drinking coffee after 5 PM may affect your sleep."
        : "Your latest coffees are inside a sleep-friendly window.",
  };
};

export const getCoffeeDNA = (entries: CoffeeEntry[]): CoffeeDNA => {
  if (entries.length === 0) {
    return {
      persona: "Fresh Starter",
      favoriteType: "Unknown",
      favoriteRoast: "Unknown",
      spendingBehavior: "No spending pattern yet",
      preferredTimeWindow: "No pattern yet",
      insightLines: ["Log your first coffee to start building your Coffee DNA."],
    };
  }

  const favoriteType = topKey(countBy(entries, (entry) => entry.type)) as CoffeeDNA["favoriteType"];
  const favoriteRoast = topKey(countBy(entries.filter((entry) => entry.roastLevel), (entry) => entry.roastLevel ?? "Unknown")) as CoffeeDNA["favoriteRoast"];
  const averageSpend = entries.reduce((sum, entry) => sum + entry.price, 0) / entries.length;
  const milkBased = entries.filter((entry) => ["Latte", "Cappuccino", "Flat White", "Mocha", "Matcha Latte"].includes(entry.type)).length;
  const weekendCount = entries.filter((entry) => {
    const day = new Date(entry.drankAt).getDay();
    return day === 0 || day === 6;
  }).length;
  const morningCount = entries.filter((entry) => {
    const hour = new Date(entry.drankAt).getHours();
    return hour >= 8 && hour <= 10;
  }).length;

  const persona = weekendCount >= Math.ceil(entries.length / 3) ? "Weekend Explorer" : "Ritual Optimizer";
  const spendingBehavior = averageSpend >= 6 ? "Premium cafe spender" : "Balanced home-and-cafe spender";
  const preferredTimeWindow = morningCount >= Math.ceil(entries.length / 3) ? "8 AM to 10 AM" : "Flexible afternoon window";

  return {
    persona,
    favoriteType,
    favoriteRoast,
    spendingBehavior,
    preferredTimeWindow,
    insightLines: [
      `You are a ${persona}.`,
      milkBased >= entries.length / 2 ? "You prefer sweet milk-based drinks." : "You lean toward cleaner black coffee profiles.",
      `You mostly drink coffee around ${preferredTimeWindow}.`,
    ],
  };
};

export const getWrappedReport = (entries: CoffeeEntry[]): WrappedReport => {
  const sorted = [...entries].sort((a, b) => new Date(a.drankAt).getTime() - new Date(b.drankAt).getTime());
  const dayCounts = countBy(entries, (entry) => new Date(entry.drankAt).toLocaleDateString("en-US", { weekday: "long" }));
  const cafeCounts = countBy(entries, (entry) => entry.shopName);
  const drinkCounts = countBy(entries, (entry) => entry.type);

  let streak = 0;
  let bestStreak = 0;
  let lastDate: Date | undefined;

  sorted.forEach((entry) => {
    const current = new Date(entry.drankAt);
    if (!lastDate || sameCalendarDay(current, lastDate)) {
      streak = Math.max(streak, 1);
    } else {
      const diff = Math.round((current.setHours(0, 0, 0, 0) - lastDate.setHours(0, 0, 0, 0)) / dayMs);
      streak = diff === 1 ? streak + 1 : 1;
    }
    bestStreak = Math.max(bestStreak, streak);
    lastDate = new Date(entry.drankAt);
  });

  return {
    totalCoffees: entries.length,
    totalSpending: entries.reduce((sum, entry) => sum + entry.price, 0),
    favoriteCafe: topKey(cafeCounts),
    favoriteDrink: topKey(drinkCounts),
    mostActiveDay: topKey(dayCounts),
    coffeeStreak: bestStreak,
  };
};

export const getSpendingSummary = (entries: CoffeeEntry[]) => {
  const daily = entries
    .filter((entry) => sameCalendarDay(new Date(entry.drankAt), new Date()))
    .reduce((sum, entry) => sum + entry.price, 0);
  const weekly = entries.filter((entry) => isInLastDays(entry.drankAt, 7)).reduce((sum, entry) => sum + entry.price, 0);
  const monthly = entries.filter((entry) => isInLastDays(entry.drankAt, 30)).reduce((sum, entry) => sum + entry.price, 0);
  const annual = monthly * 12;
  const subscriptions = Math.round(monthly / 15.49);

  return {
    daily,
    weekly,
    monthly,
    annual,
    comparison: `Your coffee spending equals ${subscriptions} Netflix subscriptions per month.`,
  };
};

export const getProductivityInsight = (entries: CoffeeEntry[], sessions: WorkSession[]) => {
  const linked = sessions
    .map((session) => ({
      session,
      coffee: entries.find((entry) => entry.id === session.coffeeEntryId),
    }))
    .filter((item): item is { session: WorkSession; coffee: CoffeeEntry } => Boolean(item.coffee));

  const best = linked.sort((a, b) => b.session.productivityScore - a.session.productivityScore)[0];
  if (!best) {
    return "Link coffees to work or study sessions to discover productivity patterns.";
  }

  const hour = new Date(best.coffee.drankAt).getHours();
  const when = hour < 10 ? "before 10 AM" : hour < 14 ? "near lunch" : "later in the day";
  return `Your most productive days happen after drinking a ${best.coffee.type} ${when}.`;
};

export const getPassportCountries = (entries: CoffeeEntry[], beans: BeanCollectionItem[]) => {
  const countries = new Set<string>();
  entries.forEach((entry) => entry.originCountry && countries.add(entry.originCountry));
  beans.forEach((bean) => countries.add(bean.originCountry));
  return Array.from(countries);
};

export const getBeanExpiryLabel = (bean: BeanCollectionItem) => {
  const days = Math.ceil((new Date(bean.expiresAt).getTime() - Date.now()) / dayMs);
  if (days <= 0) return "Expired";
  if (days <= 7) return `${days} days left`;
  return `${days} days fresh`;
};
