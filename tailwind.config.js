/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{vue,js,html}'],
    theme: {
        extend: {
            colors: {
                ['tab-hover']: '#183142',
                ['tab-foreground']: '#4B526D',
                ['tab-foreground-hover']: '#40BAEB',
                ['editor-dark']: '#0F111A',
                ['title-bar-dark']: '#090B10',
                ['button-dark']: '#292B35',
                ['button-dark-hover']: '#40BAEB',
                ['button-text-dark']: '#858585'
            },
            boxShadow: {
                ['button-dark-float']: 'inset 0 -3px 0 0 #303340',
                ['button-dark-float-hover']: 'inset 0 -3px 0 0 #124154'
            },
            fontFamily: {
                jb: ['Jetbrains Mono']
            }
        }
    },
    plugins: []
};
