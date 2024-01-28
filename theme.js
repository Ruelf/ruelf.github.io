!function () {
    const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;

    if (media) {
        function updateTheme() {
            document.querySelector('html').setAttribute('data-bs-theme', media.matches ? 'dark' : 'light');
        }

        media.addEventListener('change', () => {
            updateTheme();
        });

        updateTheme();
    }
}();
