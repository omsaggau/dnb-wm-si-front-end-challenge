module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    screens: {
      xs: '480px', // 30 rem
      sm: '640px', // 40 rem
      md: '768px', // 48 rem
      lg: '1024px', // 64 rem
      xl: '1280px', // 80 rem
    },
    
    extend: {
      fontFamily: {
        title: ['Roboto Condensed'],
        text: ['Roboto'],
      },
    },
  },
};
