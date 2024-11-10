export default {
  theme: {
    extend: {
      animation: {
        border: "border 4s linear infinite",
        tilt: "tilt 5s infinite linear",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.5deg)",
          },
          "75%": {
            transform: "rotate(-0.5deg)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
};
