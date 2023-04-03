/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          "0%": { top: 0, opacity: 0 },
          "10%": { top: 0, opacity: 1 },
          "90%": { top: 0, opacity: 1 },
          "100%": { top: "32px", opacity: 0 },
        },
        blink: {
          "0%": { color: "#ccc" },
          "50%": { color: "#fefefe" },
          "100%": { color: "#ccc" },
        },
        scalePulse: {
          "0%": {
            scale: 0,
          },
          "100%": {
            scale: 1,
            opacity: 0,
          },
        },
      },
      animation: {
        fadeOut: "fadeOut 4s infinite ease",
        blink: "blink 1.5s infinite",
        scalePulse: "scalePulse 1.2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955)",
      },
    },
  },
  plugins: [],
};
