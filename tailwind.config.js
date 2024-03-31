/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      cairo: ["Cairo", "sans-serif"],
    },
    colors: {
      colorBrand50: "#eef2ff",
      colorBrand75: "#e0e7ff",
      colorBrand100: "#e0e7ff",
      colorBrand200: "#c7d2fe",
      colorBrand500: "#6366f1",
      colorBrand600: "#4f46e5",
      colorBrand700: "#4338ca",
      colorBrand800: "#3730a3",
      colorBrand900: "#312e81",
      colorGrey50: "#f9fafb",
      colorGrey100: "#f3f4f6",
      colorGrey200: "#e5e7eb",
      colorGrey300: "#d1d5db",
      colorGrey400: "#9ca3af",
      colorGrey500: "#6b7280",
      colorGrey600: "#4b5563",
      colorGrey700: "#374151",
      colorGrey800: "#1f2937",
      colorGrey900: "#111827",
      colorZind200: "#e5e7eb",
      colorRed100: "#fee2e2",
      colorRed700: "#b91c1c",
      colorRed800: "#991b1b",
      colorBlack: "#000000",
      colorBlackLight: "#222222",
      colorWhite: "#ffffff",
      colorGreen700: "#15803d",
      colorGreen100: "#dcfce7",
      colorBlue100: "#e0f2fe", // New color
      colorBlue700: "#0369a1", // New color
      colorYellow100: "#fef9c3", // New color
      colorYellow700: "#a16207", // New color
      colorSilver100: "#e5e7eb", // New color
      colorSilver700: "#374151", // New color
      transparent: "transparent",
    },
    extend: {
      keyframes: {
        dotsLight: {
          "0%": {
            boxShadow: "20px 0 #fff, -20px 0 #fff2",
            background: "#fff",
          },
          "33%": {
            boxShadow: "20px 0 #fff, -20px 0 #fff2",
            background: "#fff2",
          },
          "66%": {
            boxShadow: "20px 0 #fff2, -20px 0 #fff",
            background: "#fff2",
          },
          "100%": {
            boxShadow: "20px 0 #fff2, -20px 0 #fff",
            background: "#fff",
          },
        },
        dotsDark: {
          "0%": {
            boxShadow: "20px 0 #000, -20px 0 #0002",
            background: "#000",
          },
          "33%": {
            boxShadow: "20px 0 #000, -20px 0 #0002",
            background: "#0002",
          },
          "66%": {
            boxShadow: "20px 0 #0002, -20px 0 #000",
            background: "#0002",
          },
          "100%": {
            boxShadow: "20px 0 #0002, -20px 0 #000",
            background: "#000",
          },
        },
      },
      animation: {
        dotsLight: "dotsLight 1s infinite linear alternate",
        dotsDark: "dotsDark 1s infinite linear alternate",
      },
      boxShadow: {
        boxShodwoPupop: "0 2px 6px 6px rgb(0 0 0 / 0.03)",
        mapPopup: "0 2px 2px 2px rgb(0 0 0 / 0.3)",
      },
      borderRadius: {
        tiny: "3px",
        sm: "5px",
        md: "7px",
        lg: "9px",
      },
      backdropColor: {
        default: "rgba(255, 255, 255, 0.1)",
      },
      imageGrayscale: {
        0: "0",
      },
      imageOpacity: {
        100: "100%",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
