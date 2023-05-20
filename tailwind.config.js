/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: 'class',
  theme: {
    screens: {
      xs: "614px",
      //sm md lg 定义为差不多大小
      sm: "1002px", // 原值640px
      md: "1022px", // 原值768px
      lg: "1092px", // 原值1024px
      xl: "1280px",
    },
    extend: {
      colors: {
        // 自定义颜色
        dim: {
          50: "#5F99F7",
          100: "#5F99F7",
          200: "#38444d",
          300: "#202e3a",
          400: "#253341",
          500: "#5F99F7",
          600: "#5F99F7",
          700: "#192734",
          800: "#162d40",
          900: "#15202b",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

