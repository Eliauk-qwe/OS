/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 品牌配色 - 温馨传统中式餐饮风格
        primary: {
          50: '#fef5e7',
          100: '#fde8c3',
          200: '#fbd99b',
          300: '#f9ca73',
          400: '#f7bb4b',
          500: '#f5ac23', // 主色 - 温暖的金黄色
          600: '#d99520',
          700: '#bd7e1c',
          800: '#a16718',
          900: '#855014',
        },
        secondary: {
          50: '#f4f1ed',
          100: '#e5ddd2',
          200: '#d6c9b7',
          300: '#c7b59c',
          400: '#b8a181',
          500: '#a98d66', // 辅助色 - 温暖的棕色
          600: '#947a58',
          700: '#7f674a',
          800: '#6a543c',
          900: '#55412e',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // 强调色 - 中国红
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Noto Serif SC', 'SimSun', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      minHeight: {
        'touch': '44px', // 最小触摸目标尺寸
      },
      minWidth: {
        'touch': '44px', // 最小触摸目标尺寸
      },
    },
  },
  plugins: [],
}
