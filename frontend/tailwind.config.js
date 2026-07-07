/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Derived from the Vijaya Clinics logo (split brain/face mark)
        teal: {
          50: '#EEF7F6',
          100: '#D7EDEA',
          200: '#B0DBD5',
          300: '#84C6BE',
          400: '#57ADA3',
          500: '#2F8F86',
          600: '#1F6E6C',
          700: '#175655', // deep teal - primary
          800: '#12403F',
          900: '#0C2C2C',
        },
        mint: {
          50: '#F3FBF9',
          100: '#E1F5F0',
          200: '#BFE9DF',
          300: '#98DACB',
          400: '#79CCBB', // aqua/mint - secondary
          500: '#5CB8A6',
          600: '#469C8C',
        },
        sand: {
          50: '#FBFAF7',
          100: '#F5F2EB',
        },
        ink: '#132523',
        gold: '#C9A15A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'teal-fade': 'linear-gradient(135deg, #175655 0%, #2F8F86 50%, #79CCBB 100%)',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(23, 86, 85, 0.25)',
        card: '0 4px 24px rgba(19, 37, 35, 0.08)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
