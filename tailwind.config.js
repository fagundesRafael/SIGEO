//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        lineEffect: {
          '0%': { 
            width: '0%',
            right: '0' 
          },
          '50%': { 
            width: '100%',
            right: '0' 
          },
          '100%': { 
            width: '0%',
            right: 'auto',
            left: '0' 
          }
        },
        typing: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        glow: {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(3)" },
        },
        softglow: {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.5)" },
        },
      },
      animation: {
        lineEffect: 'lineEffect 2s ease-in-out 1s infinite',
        typing: "typing 0.8s steps(10, end) forwards",
        glow: "glow 1s ease-in-out infinite",
        softglow: "softglow 1s ease-in-out infinite",
      },
      colors: {
        c_deep_black: "#1d1d1b",
        c_deep_middle_black: "#1a1b1f",
        c_deep_gray_black: "#2b2e33",
        c_components_gray: "#424242",
        c_button_red: "#e9454b",
        c_common_red: "#e33e44",
        c_logo_red: "#db1f27",
        c_older_yellow: "#b28e45",
        c_text_blue: "#62a1d8",
      },
    },
  },
  plugins: [],
};
