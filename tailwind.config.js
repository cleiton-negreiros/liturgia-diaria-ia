// tailwind.config.js - MINIMALISTA
const { themeColors } = require("./theme.config");

const tailwindColors = Object.fromEntries(
  Object.entries(themeColors).map(([name, swatch]) => [
    name,
    { DEFAULT: `var(--color-${name})`, light: swatch.light, dark: swatch.dark },
  ]),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}", "./lib/**/*.{js,ts,tsx}", "./hooks/**/*.{js,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: { ...tailwindColors, tint: tailwindColors.primary },
    },
  },
  plugins: [],
};