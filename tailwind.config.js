var flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default;

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Lato", "sans-serif"],
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
        primary60: "#5D5D88",
        primary30: "#B9B9CA",
        warning: "#FFFFCB",
        secondary: "#83C8B7",
        secondary75: "#B1DAD0",
        secondary50: "#D4E8E3",
        accent: "#EEB523",
        accent75: "#F0C558",
        accent50: "#F2D68C",
        accent25: "#F4E6C1",
        grey100: "#504520",
        grey75: "#797155",
        grey50: "#A39D8B",
        grey25: "#CCCAC0",
        grey10: "#E5E4E1",
      },
      borderColor: {
        primary: "#2A2A63",
        primary60: "#5D5D88",
        primary30: "#B9B9CA",
        warning: "#FFFFCB",
        secondary: "#83C8B7",
        secondary75: "#B1DAD0",
        secondary50: "#D4E8E3",
        accent: "#EEB523",
        accent75: "#F0C558",
        accent50: "#F2D68C",
        accent25: "#F4E6C1",
        grey100: "#504520",
        grey75: "#797155",
        grey50: "#A39D8B",
        grey25: "#CCCAC0",
        grey10: "#E5E4E1",
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
