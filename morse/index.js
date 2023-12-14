const morse = {
    data: [
        ['a', '.-'],
        ['b', '-...'],
        ['c', '-.-.'],
        ['d', '-..'],
        ['e', '.'],
        ['f', '..-.'],
        ['g', '--.'],
        ['h', '....'],
        ['i', '..'],
        ['j', '.---'],
        ['k', '-.-'],
        ['l', '.-..'],
        ['m', '--'],
        ['n', '-.'],
        ['o', '---'],
        ['p', '.--.'],
        ['q', '--.-'],
        ['r', '.-.'],
        ['s', '...'],
        ['t', '-'],
        ['u', '..-'],
        ['v', '...-'],
        ['w', '.--'],
        ['x', '-..-'],
        ['y', '-.--'],
        ['z', '--..'],
        ['0', '-----'],
        ['1', '.----'],
        ['2', '..---'],
        ['3', '...--'],
        ['4', '....-'],
        ['5', '.....'],
        ['6', '-....'],
        ['7', '--...'],
        ['8', '---..'],
        ['9', '----.'],
        ['.', '.-.-.-'],
        [',', '--..--'],
        ['?', '..--..'],
        ['\'', '.----.'],
        ['!', '-.-.--'],
        ['/', '-..-.'],
        ['(', '-.--.'],
        [')', '-.--.-'],
        ['&', '.-...'],
        [':', '---...'],
        [';', '-.-.-.'],
        ['=', '-...-'],
        ['+', '.-.-.'],
        ['-', '-....-'],
        ['_', '..--.-'],
        ['"', '.-..-.'],
        ['$', '...-..-.'],
        ['@', '.--.-.'],
        ['\u00bf', '..-.-'],
        ['\u00a1', '--...-'],
        [' ', '/'],
        ['', ''],
    ],

    input: {
        text: () => document.getElementById('text'),
        morse: () => document.getElementById('morse'),
    },

    feedback: () => document.getElementById('feedback'),

    isValid: true,
    invalid: [],

    encodeCharacter(char) {
        const lowerChar = char.toLowerCase();
        for (const [chr, mrs] of this.data) {
            if (chr === lowerChar) {
                return mrs;
            }
        }
        return char;
    },

    decodeCharacter(char) {
        for (const [chr, mrs] of this.data) {
            if (mrs === char) {
                return chr;
            }
        }

        this.isValid = false;
        this.invalid.push(char);
        return char;
    },

    encodeLine(line) {
        return line.split('')
            .map(char => this.encodeCharacter(char))
            .join(' ');
    },

    decodeLine(line) {
        return line.split(' ')
            .map(char => this.decodeCharacter(char))
            .join('');
    },

    encodeString(string) {
        return string.split('\n')
            .map(line => this.encodeLine(line))
            .join('\n');
    },

    decodeString(string) {
        return string.split('\n')
            .map(line => this.decodeLine(line))
            .join('\n');
    },

    encode() {
        this.input.morse().value = this.encodeString(this.input.text().value);
    },

    decode() {
        this.input.text().value = this.decodeString(this.input.morse().value);
    },

    updateFeedback() {
        const m = this.input.morse();
        if (this.isValid || m.value.trim() === '') {
            m.classList.remove('is-invalid');
        } else {
            m.classList.add('is-invalid');
            const fb = this.invalid.map(x => `"${x}"`).join(', ');
            this.feedback().textContent = 'Invalid morse found: ' + fb;
        }
    },

    onInput({ target }) {
        this.isValid = true;
        this.invalid = [];
        target.id === 'text' ? this.encode() : this.decode();
        this.updateFeedback();
    },
};

addEventListener('input', event => { morse.onInput(event); });
