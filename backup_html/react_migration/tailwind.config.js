/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
          card: "#0a0a0a",
          elevated: "#121212",
          border: "#1f1f1f",
        },
        white: {
          DEFAULT: "#FFFFFF",
          muted: "#a3a3a3",
          dim: "#737373",
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 255, 255, 0.05)',
        'glow-md': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-lg': '0 0 35px rgba(255, 255, 255, 0.15)',
        'glow-white': '0 0 15px rgba(255, 255, 255, 0.3)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-size': '60px 60px',
      },
      animation: {
        'grid-move': 'gridMove 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
      },
      keyframes: {
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
