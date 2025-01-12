/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      // sepia for base color range
      base: {
        100: "#fcfbfa",
        200: "f7f5f2",
        300: "#f0ebe4",
        400: "#e0dace",
        500: "#bfb4a3",
        600: "#968A75",
        700: "#695f4d",
        800: "#474030",
        900: "#2b2718",
      },
      gold: {
        50: "#fee47b",
        100: "#e7ca17",
        200: "#cbb21b",
        300: "#b09a1c",
        400: "#94821c",
        500: "#7b6b1b",
        600: "#615419",
        700: "#494016",
        800: "#322c12",
        900: "#1d190b",
      },
      sea_green: {
        50: "#97faa4",
        100: "#19ea63",
        200: "#21cd58",
        300: "#24b14e",
        400: "#259543",
        500: "#247a39",
        600: "#21612f",
        700: "#1d4925",
        800: "#17321b",
        900: "#111c11",
      },
      phthalo_blue: {
        50: "#e9e0fe",
        100: "#d3c2fe",
        200: "#bba5fd",
        300: "#a188fb",
        400: "#846cf9",
        500: "#5e50f7",
        600: "#1934f4",
        700: "#2529b2",
        800: "#241e73",
        900: "#1a143a",
      },
      cerise: {
        50: "#ffdbec",
        100: "#ffb6d9",
        200: "#ff8dc6",
        300: "#fb60b4",
        400: "#f416a2",
        500: "#c71e85",
        600: "#9d2069",
        700: "#741e4e",
        800: "#4d1935",
        900: "#29121d",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
