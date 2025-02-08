import type { Config } from 'tailwindcss'

export default {
  // Définit les fichiers où Tailwind doit scanner les classes CSS
  content: [
    './pages/**/*.{vue,js,ts}', // Pages Nuxt
    './layouts/**/*.{vue,js,ts}', // Layouts Nuxt
    './components/**/*.{vue,js,ts}', // Composants Nuxt
  ],
  theme: {
    extend: {
      // Ajoute des couleurs personnalisées (utiles pour garder une cohérence visuelle)
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Couleur primaire principale
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094', // Couleur secondaire principale
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
      },
      // Ajoute une image de fond nommée (alternative au fichier CSS global)
      backgroundImage: {
        'app-bg': "url('/bg.png')",
      },
    },
  },
  plugins: [],
} satisfies Config
