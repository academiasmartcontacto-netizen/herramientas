/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22226B',
        secondary: '#3498db',
        accent: '#e74c3c',
        success: '#27ae60',
        warning: '#f39c12',
        light: '#ecf0f1',
      },
    },
  },
  plugins: [],
}
