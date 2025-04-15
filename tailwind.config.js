/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: 4 / 3,
      spacing: {
        "4rem": "4rem",
      },
    },
  },
  plugins: [],
};
