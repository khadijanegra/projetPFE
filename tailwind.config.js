/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  assets: ['./assets'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto-Bold', 'sans-serif'], // Exemple de police personnalisée Roboto
        lobster: ['Lobster-Regular', 'cursive'], // Exemple de police personnalisée Lobster
      },
    },
  },
  plugins: [],
}