/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B1020',
          800: '#10172A',
          700: '#1E293B',
          600: '#334155'
        },
        royal: {
          500: '#7C3AED',
          600: '#6941C6',
          700: '#5B21B6',
          800: '#4C1D95'
        },
        gold: {
          300: '#FDE047',
          400: '#EAB308',
          500: '#D6AD60',
          600: '#B8860B',
          700: '#92400E'
        },
        bgLight: '#F7F7FB',
        bgDark: '#0B1020'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-devanagari)', 'sans-serif'],
        devanagari: ['var(--font-noto-devanagari)', 'serif']
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at top, #1E1B4B 0%, #0B1020 70%)',
        'gold-gradient': 'linear-gradient(135deg, #F9E79F 0%, #D6AD60 50%, #B8860B 100%)',
        'purple-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #6941C6 100%)'
      }
    }
  },
  plugins: []
};
