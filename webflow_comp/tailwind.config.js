
/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./index.html",
    "./src/**/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      width: {
        custom: "240px",
        events: "50vw",
        input: "94px"
      },
      height: {
        ch: "130px",
        interactionHeight: '30%'
      },
      colors: {
        na: "#292929",
        naBold: "#151515",
        icon: "#868686",
        lightCs: "#424242"
      },
      padding: {
        cpd: '1px'
      },
      rotate: {
        '270': '270deg',
      },
    },
  },
  plugins: [],
}