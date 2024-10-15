const colors = require("tailwindcss/colors");
const { marquee } = require("./src/styles/static");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      ...colors,
      primary: "#2EF867",
      secondary: "#FEF141",
      white: "#FFFDFD",
      black: "#000000",
      pink: "#FE26A6",
      orange: "#FEB241",
      blue: "#00B3FF",
      grey: "#232323",
      error: "#F82E2E",
      mattGreen: '#3BEC70',
      ...marquee.colors,
    },
    extend: {
      keyframes: {
        rotate90: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        rotateBack: {
          "0%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        fullMenuHeight: {
          "0%": { height: "0", opacity: 0 },
          "100%": { height: "230px", opacity: 1 },
        },
        zeroMenuHeight: {
          "0%": { height: "230px", opacity: 1 },
          "100%": { height: "0", opacity: 0 },
        },
      },
      animation: {
        rotate90: "rotate90 0.3s linear forwards",
        rotateBack: "rotateBack 0.3s linear forwards",
        fullMenuHeight: "fullMenuHeight 0.3s linear forwards",
        zeroMenuHeight: "zeroMenuHeight 0.3s linear forwards",
      },
      fontFamily: {
        sequel100Black: ['"Sequel100Black"', "sans-serif"],
        spaceMono: ['"SpaceMono"', "monospace"],
      },
      fontWeight: {
        45: "45",
        55: "55",
        65: "65",
        75: "75",
        85: "85",
        95: "95",
        105: "105",
        115: "115",
        regular: "400",
        bold: "700",
      },
      width: {
        ...marquee.width,
      },
      minWidth: {
        ...marquee.minWidth,
      },
      margin: {
        ...marquee.margin,
      },
      borderRadius: {
        medium: "22px",
      },
    },
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".logo-wrapper p": {
          display: "flex",
          justifyContent: "center",
          lineHeight: "5px",
          margin: "0",
          padding: "0.5px 0",
          fontSize: "5px",
        },
      });
    },
  ],
};
