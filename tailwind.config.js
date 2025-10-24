/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        bg1: "#0A2647",
        bg2: "#144272"
      },
      fontFamily: {
        poppins: "Poppins",
        playfair: 'Playfair Display'
      },
      textColor:{
        Primary: '#9b59b6'
      }

    },
  },
  plugins: [],
}

