import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'Roboto', 'sans-serif'],
      },
      colors: {
        gray: {
          150: '#EBECF0',
        },
        slate: {
          150: '#E7ECF3',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
