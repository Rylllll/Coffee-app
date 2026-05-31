/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        espresso: "#210B05",
        mocha: "#5C3A2A",
        crema: "#FFF9EF",
        latte: "#DCC3AA",
        orange: "#C96B38",
        sage: "#7C9A78",
        ink: "#140B08",
        mist: "#F8EFE6",
        foam: "#FFFFFF",
        almond: "#EFE0D2",
        caramel: "#B8794D",
        cocoa: "#3B170F",
        blush: "#F3DFD3",
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
