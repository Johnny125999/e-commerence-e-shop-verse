import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      height: {
        'error-screen': 'calc(100vh - 196px)',
        'payment-screen': 'calc(100vh - 196px)',
        'content-screen': 'calc(100vh - 196px)',
      },
      maxWidth: {
        'content-screen':
          'calc(100vw - var(--global-px) - var(--scrollbar-width))',
      },
      colors: {
        bg: 'rgb(var(--tw-color-bg) / <alpha-value>)',
        dark: '#222222',
        green: {
          800: 'var(--green-800)',
          700: 'var(--green-700)',
          600: 'var(--green-600)',
          50: 'var(--green-50)',
        },
        brown: {
          300: 'var(--brown-300)',
        },
        gray: {
          400: 'var(--gray-400)',
          600: 'var(--gray-600)',
          800: 'var(--gray-800)',
        },
        yellow: {
          500: 'var(--yellow-500)',
        },
      },
      lineHeight: {
        '14': '3.25rem',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        collapsibleSlideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        collapsibleSlideUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.5)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentOverlayCLose: {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        spinner: {
          '0%': {
            strokeDashOffset: (-3.14 * 2 * 20).toString(),
            transform: 'rotate(0deg)',
          },
          '50%': {
            strokeDashoffset: (3.14 * 2 * 20).toString(),
            transform: 'rotate(540deg)',
          },
          '100%': {
            strokeDashoffset: (-3.14 * 2 * 20).toString(),
            transform: 'rotate(1080deg)',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentOverlayCLose:
          'contentOverlayCLose 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        spinner: 'spinner 4s ease-out infinite',
        collapsibleSlideDown:
          'collapsibleSlideDown 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        collapsibleSlideUp:
          'collapsibleSlideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
} satisfies Config
