<script setup lang="ts">
import { computed, ref } from 'vue';

const morse = new Map(
    Object.entries({
        'a': '.-',
        'b': '-...',
        'c': '-.-.',
        'd': '-..',
        'e': '.',
        'f': '..-.',
        'g': '--.',
        'h': '....',
        'i': '..',
        'j': '.---',
        'k': '-.-',
        'l': '.-..',
        'm': '--',
        'n': '-.',
        'o': '---',
        'p': '.--.',
        'q': '--.-',
        'r': '.-.',
        's': '...',
        't': '-',
        'u': '..-',
        'v': '...-',
        'w': '.--',
        'x': '-..-',
        'y': '-.--',
        'z': '--..',
        '0': '-----',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
        '.': '.-.-.-',
        ',': '--..--',
        '?': '..--..',
        "'": '.----.',
        '!': '-.-.--',
        '/': '-..-.',
        '(': '-.--.',
        ')': '-.--.-',
        '&': '.-...',
        ':': '---...',
        ';': '-.-.-.',
        '=': '-...-',
        '+': '.-.-.',
        '-': '-....-',
        '_': '..--.-',
        '"': '.-..-.',
        '$': '...-..-.',
        '@': '.--.-.',
        '\u00bf': '..-.-',
        '\u00a1': '--...-',
        ' ': '/',
    }),
);

const textInput = ref('');
const morseInput = ref('');
const invalidChars = ref<string[]>([]);

const invalid = computed(() => invalidChars.value.filter((x) => x !== ''));

function encodeCharacter(char: string): string {
    return morse.get(char.toLowerCase()) || char;
}

function decodeCharacter(char: string): string {
    for (const [key, value] of morse) {
        if (value === char) {
            return key;
        }
    }

    invalidChars.value.push(char);
    return char;
}

function encodeLine(line: string): string {
    return line
        .split('')
        .map((char) => encodeCharacter(char))
        .join(' ');
}

function decodeLine(line: string): string {
    return line
        .split(' ')
        .map((char) => decodeCharacter(char))
        .join('');
}

function encodeString(string: string): string {
    return string
        .split('\n')
        .map((line) => encodeLine(line))
        .join('\n');
}

function decodeString(string: string): string {
    return string
        .split('\n')
        .map((line) => decodeLine(line))
        .join('\n');
}

function encode() {
    morseInput.value = encodeString(textInput.value);
}

function decode() {
    invalidChars.value = [];
    textInput.value = decodeString(morseInput.value);
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
            Text
            <textarea
                rows="10"
                v-model="textInput"
                @input="encode"
                class="p-4 dark:bg-gray-800"
            ></textarea>
        </div>
        <div class="flex flex-col gap-1">
            Morse
            <textarea
                rows="10"
                v-model="morseInput"
                @input="decode"
                class="p-4 dark:bg-gray-800"
            ></textarea>
            <div v-if="invalid.length" class="text-red-500">
                Invalid:
                {{ invalid.map((x) => `"${x}"`).join(', ') }}
            </div>
        </div>
    </div>
</template>
