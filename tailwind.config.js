/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#F8FAFC',
        secondarySurface: '#FFFFFF',
        accentColor: '#2563EB',
        secondaryAccent: '#0EA5E9',
        successColor: '#10B981',
        textPrimary: '#0F172A',
        textSecondary: '#64748B',
        borderColor: 'rgba(15,23,42,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'Geist', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(15, 23, 42, 0.03), 0 2px 8px -1px rgba(15, 23, 42, 0.02)',
        glass: '0 8px 32px 0 rgba(15, 23, 42, 0.05)',
      },
    },
  },
  plugins: [],
}
