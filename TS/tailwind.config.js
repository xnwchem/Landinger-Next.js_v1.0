/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/component/**/*.{js,ts,jsx,tsx}',
        "./node_modules/preline/preline.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['"Cabinet Grotesk"', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('preline/plugin'),
    ],
};
