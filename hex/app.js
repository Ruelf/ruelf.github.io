const app = {
    table: null,
    result: localStorage.getItem('result')?.split('') ?? [],
    theme: localStorage.getItem('theme') ?? 'auto',
    themeIcons: {
        light: 'sun-fill',
        dark: 'moon-fill',
        auto: 'circle-half',
    },

    async loadTable() {
        const response = await fetch('/hex/table.json');
        this.table = await response.json();
    },

    systemTheme() {
        // https://stackoverflow.com/a/57795495
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    },

    getTheme() {
        return this.theme === 'auto'
            ? this.systemTheme()
            : this.theme;
    },

    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem('theme', theme);
        this.updateTheme();
    },

    updateTheme() {
        $('#theme')
            .removeClass()
            .addClass(`bi bi-${this.themeIcons[this.theme]}`);

        $('button[name=theme]').removeClass('active');
        $(`button[value=${this.theme}]`).addClass('active');
        $('html').attr('data-bs-theme', this.getTheme());

        if (this.getTheme() === 'light') {
            $('.inner.bg-dark')
                .addClass('bg-light')
                .removeClass('bg-dark');
        } else {
            $('.inner.bg-light')
                .addClass('bg-dark')
                .removeClass('bg-light');
        }
    },

    bg() {
        return this.getTheme() === 'light'
            ? 'bg-secondary'
            : 'bg-secondary';
    },

    defaultBg() {
        return this.getTheme() === 'light'
            ? 'bg-light'
            : 'bg-dark';
    },

    getCode() {
        return parseInt(
            $('.inner')
                .toArray()
                .map(el => +$(el).hasClass(this.bg()))
                .join(''),
            2,
        );
    },

    getLetter() {
        return this.table[this.getCode()];
    },

    setHexagons(code) {
        code.toString(2).padStart(5, '0').split('').forEach((x, i) => {
            $(`#i${i}`)
                .removeClass(this.bg())
                .removeClass(this.defaultBg())
                .addClass(+x ? this.bg() : this.defaultBg());
        });
        this.setPreview();
    },

    setPreview() {
        localStorage.setItem('current', this.getCode());
        const c = this.getLetter();
        $('#preview').text(c === ' ' ? 'Space' : c);
    },

    updateResult() {
        localStorage.setItem('result', this.result.join(''));
        $('#result').text(this.result.join(''));
    },

    clearResult() {
        this.result.length = 0;
        this.updateResult();
    },

    reset() {
        this.setHexagons(0);
        this.clearResult();
    },

    initBootstrapTooltips() {
        $('.has-tooltip').each(
            (_, el) => new bootstrap.Tooltip(el),
        );
    },

    loadLocalStorage() {
        this.updateResult();
        this.setHexagons(+localStorage.getItem('current') ?? 0);
    },

    initTheme() {
        this.updateTheme();

        for (const [key, value] of Object.entries(this.themeIcons)) {
            $(`#${key}ThemeIcon`).addClass(`bi bi-${value}`);
        }

        $('button[name=theme]').click(event => {
            this.setTheme(event.target.value);
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            this.updateTheme();
        });
    },

    registerEvents() {
        // Hexagons
        $('.inner').click(({ target }) => {
            $(target)
                .toggleClass(this.bg())
                .toggleClass(this.defaultBg());

            this.setPreview();
        });

        // Buttons
        $('#append').click(() => {
            this.result.push(this.getLetter());
            this.updateResult();
        });

        $('#backspace').click(() => {
            this.result.pop();
            this.updateResult();
        });

        $('#clear').click(() => {
            this.clearResult();
        });

        $('#reset').click(() => {
            this.reset();
        });

        // Keys
        addEventListener('keydown', ({ key, ctrlKey }) => {
            if (ctrlKey) {
                return;
            }

            if (key === 'Enter') {
                $('#append').click();
            }

            key = key.toUpperCase().replace('SPACE', ' ');
            if (!this.table.includes(key)) {
                return;
            }

            this.setHexagons(this.table.indexOf(key));
        });
    },

    async ready() {
        const promise = this.loadTable()
        this.initBootstrapTooltips();
        this.registerEvents();
        this.initTheme();

        await promise;
        this.loadLocalStorage();

        $('body').removeClass('opacity-0');
    },

    run() {
        $(document).ready(() => {
            this.ready();
        });
    },
};

app.run();
