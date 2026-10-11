const { fontFamily } = require('tailwindcss/defaultTheme');

const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: token('background'),
        surface: token('surface'),
        foreground: token('foreground'),
        muted: token('muted'),
        line: token('line'),
        accent: token('accent'),
        chart: token('chart'),
      },
      borderColor: {
        DEFAULT: token('line'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      maxWidth: {
        page: '52rem',
      },
    },
  },
  plugins: [],
};
