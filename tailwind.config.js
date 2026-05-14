/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-dark': 'var(--color-primary-dark)',
        'primary-accent': 'var(--color-primary-accent)',
        'primary-dark-hover': 'var(--color-primary-dark-hover)',
        'primary-dark-darker': 'var(--color-primary-dark-darker)',
        'accent-hover': 'var(--color-accent-hover)',
        
        // Background colors
        'bg-page': 'var(--color-bg-page)',
        'bg-light-gray': 'var(--color-bg-light-gray)',
        'bg-cream-warm': 'var(--color-bg-cream-warm)',
        'bg-cream-light': 'var(--color-bg-cream-light)',
        'bg-green-light': 'var(--color-bg-green-light)',
        'bg-almost-white': 'var(--color-bg-almost-white)',
        
        // Text colors
        'text-dark-gray': 'var(--color-text-dark-gray)',
        'text-primary': 'var(--color-text-primary)',
        'text-muted': 'var(--color-text-muted)',
      },
    },
  },
  plugins: [],
}