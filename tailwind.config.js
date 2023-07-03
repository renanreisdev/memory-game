/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transform: {
        'preserve-3d': 'preserve-3d',
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(40px, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "60px"
          }  
        },
        typingEnd: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "50%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "black"
          }  
        },
        slideIn: {
          "0%": {
            height: "0vh"
          },
          "35%": {
            height: "50vh"
          },
          "65%": {
            height: "50vh"
          },
          "100%": {
            height: "0vh"
          },
        },
        disappear: {
          "0%": {
            opacity: '0'
          },
          "35%": {
            opacity: '1'
          },
          "65%": {
            opacity: '1'
          },
          "100%": {
            opacity: '0'
          },
        },
        gridEffectIn: {
          "0%": {
            position: 'relative',
            top: '-40vh',
            left: '40vw',
            gap: '200px',
          },
          "100%": {
            position: 'relative',
            top: '0',
            left: '0',
            gap: '16px'
          }
        },
        bounceMe: {
          "0%, 100%": {
            transform: 'translate(1%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          "50%": {
            transform: 'translate(-1%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        bounceFloat: {
          "0%": {
            transform: 'translateY(0%)',
          },
          "50%": {
            transform: 'translateY(-2%)',
          },
          "100%": {
            transform: 'translateY(0%)',
          }
        },
        flipCard: {
          "0%": {
            rotateY: '0'
          },
          "100%": {
            rotateY: '180deg'
          }
        }
      },
      animation: {
        typing: "typing 2s steps(20) alternate, blink .7s",
        typingEnd: "typingEnd 4s steps(20) alternate, blink .7s infinite",
        slideIn: "slideIn 3s",
        disappear: "disappear 3s",
        gridEffectIn: "gridEffectIn 1s linear, bounceFloat 5s ease-in-out infinite",
        bounceMe: "bounceMe .3s infinite",
        bounceFloat: "bounceFloat 1.5s ease-in-out infinite",
        flipCard: "flipCart 1s"
      },
    },
  },
  plugins: [],
}