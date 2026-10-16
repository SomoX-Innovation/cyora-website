import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#10100E',
        gold: { DEFAULT: '#C7A56A', light: '#E3C892' },
        ivory: '#F7F3EB',
        cinnamon: '#7A4227',
        forest: '#263C30',
        rust: '#9A3B1C',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Helvetica Neue', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1320px' },
    },
  },
  plugins: [],
};

export default config;
