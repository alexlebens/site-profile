/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/preline/preline.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: ({ theme }) => ({
        blog: {
          css: {
            '--tw-prose-body': theme('colors.neutral[700]'),
            '--tw-prose-headings': theme('colors.neutral[900]'),
            '--tw-prose-lead': theme('colors.neutral[700]'),
            '--tw-prose-links': theme('colors.orange[300]'),
            '--tw-prose-bold': theme('colors.neutral[900]'),
            '--tw-prose-counters': theme('colors.neutral[600]'),
            '--tw-prose-bullets': theme('colors.neutral[400]'),
            '--tw-prose-hr': theme('colors.neutral[300]'),
            '--tw-prose-quotes': theme('colors.neutral[500]'),
            '--tw-prose-quote-borders': theme('colors.neutral[300]'),
            '--tw-prose-captions': theme('colors.neutral[700]'),
            '--tw-prose-code': theme('colors.neutral[700]'),
            '--tw-prose-pre-code': theme('colors.neutral[900]'),
            '--tw-prose-pre-bg': theme('colors.white'),
            '--tw-prose-th-borders': theme('colors.neutral[300]'),
            '--tw-prose-td-borders': theme('colors.neutral[200]'),

            '--tw-prose-invert-body': theme('colors.neutral[400]'),
            '--tw-prose-invert-headings': theme('colors.neutral[200]'),
            '--tw-prose-invert-lead': theme('colors.neutral[300]'),
            '--tw-prose-invert-links': theme('colors.orange[300]'),
            '--tw-prose-invert-bold': theme('colors.neutral[300]'),
            '--tw-prose-invert-counters': theme('colors.neutral[400]'),
            '--tw-prose-invert-bullets': theme('colors.neutral[600]'),
            '--tw-prose-invert-hr': theme('colors.neutral[700]'),
            '--tw-prose-invert-quotes': theme('colors.neutral[500]'),
            '--tw-prose-invert-quote-borders': theme('colors.neutral[500]'),
            '--tw-prose-invert-captions': theme('colors.neutral[400]'),
            '--tw-prose-invert-code': theme('colors.neutral[350]'),
            '--tw-prose-invert-pre-code': theme('colors.neutral[300]'),
            '--tw-prose-invert-th-borders': theme('colors.neutral[600]'),
            '--tw-prose-invert-td-borders': theme('colors.neutral[700]'),
          },
        },
        DEFAULT: {
          css: {
            blockquote: {
              fontStyle: 'normal',
              quotes: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('tailwindcss/nesting'),
    require('preline/plugin'),
    require('@tailwindcss/typography'),
  ],
};
