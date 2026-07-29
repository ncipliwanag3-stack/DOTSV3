/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.tsx",
    ],
    theme: {
        extend: {
            colors: {
                'manobo': {
                    primary: '#8B4513',
                    secondary: '#D2691E',
                    accent: '#CD853F',
                    dark: '#3E2723',
                    light: '#FFF8F0',
                    pattern: '#4A2810',
                }
            },
            backgroundImage: {
                'manobo-pattern': "url('/images/manobo-pattern.png')",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [
         require('@tailwindcss/forms'),
         require('@tailwindcss/typography'),
    ],
}