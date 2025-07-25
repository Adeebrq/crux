/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        cursor: {
          'pointer': 'pointer',
          'not-allowed': 'not-allowed',
          'grab': 'grab',
          'grabbing': 'grabbing',
        }
      },
    },
    plugins: [],
  }