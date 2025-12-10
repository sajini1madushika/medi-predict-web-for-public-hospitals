/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mpPrimary: '#0FB9B1',
        mpSecondary: '#0A7F78',
        mpAccent: '#A7FFEB',
        mpBg: '#F6FFFD',
        mpText: '#0F172A',
      },
      borderRadius: {
        mpLg: '16px',
        mpXl: '24px',
      },
      boxShadow: {
        mpSoft: '0 12px 30px rgba(15, 185, 177, 0.18)',
      },
    },
  },
  plugins: [],
};
