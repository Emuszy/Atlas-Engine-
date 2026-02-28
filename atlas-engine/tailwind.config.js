/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        surface: {
          0: '#0d0d14',
          1: '#12121c',
          2: '#1a1a28',
          3: '#22223a',
          4: '#2e2e4a',
        },
        bull: {
          DEFAULT: '#00d68f',
          dim: '#00d68f33',
          muted: '#00d68f99',
        },
        bear: {
          DEFAULT: '#ff4d6d',
          dim: '#ff4d6d33',
          muted: '#ff4d6d99',
        },
        accent: {
          DEFAULT: '#7c6df0',
          dim: '#7c6df033',
          light: '#a89cf5',
        },
        warn: '#f0b429',
        ink: {
          1: '#f0f0fa',
          2: '#a0a0c0',
          3: '#606080',
          4: '#303050',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scan: { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '0 100%' } },
      },
    },
  },
  plugins: [],
}
