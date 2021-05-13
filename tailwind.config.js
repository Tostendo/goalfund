var flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette")
  .default;

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: [
        "Raleway",
        "HelveticaNeue",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
    },
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    extend: {
      colors: {
        primary: "#2A2A63",
        warning: "#FFFFCB",
        secondary: "#83C8B7",
      },
      borderColor: {
        primary: "#2A2A63",
        secondary: "#83C8B7",
      },
      height: {
        "screen-2/3": "calc(100vh / 3 * 2)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme("borderColor"));
      delete colors["default"];

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants("borderColor"));
    },
  ],
};
