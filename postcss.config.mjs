/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': false,
      },
    },
  },
};

export default config;
