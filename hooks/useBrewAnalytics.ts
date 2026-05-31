import { useMemo } from "react";
import { useBrewStore } from "@/src/stores/useBrewStore";
import {
  getCaffeineSummary,
  getCoffeeDNA,
  getPassportCountries,
  getProductivityInsight,
  getSpendingSummary,
  getWrappedReport,
} from "@/src/utils/analytics";

export const useBrewAnalytics = () => {
  const coffees = useBrewStore((state) => state.coffees);
  const beans = useBrewStore((state) => state.beans);
  const workSessions = useBrewStore((state) => state.workSessions);
  const user = useBrewStore((state) => state.user);

  return useMemo(
    () => ({
      caffeine: getCaffeineSummary(coffees, user?.caffeineLimitMg ?? 400),
      dna: getCoffeeDNA(coffees),
      wrapped: getWrappedReport(coffees),
      spending: getSpendingSummary(coffees),
      productivity: getProductivityInsight(coffees, workSessions),
      passportCountries: getPassportCountries(coffees, beans),
    }),
    [beans, coffees, user?.caffeineLimitMg, workSessions],
  );
};
