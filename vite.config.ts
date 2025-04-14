import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        postcss: './postcss.config.js',
    },
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    const matches = id.match(
                        /@fortawesome\/free\-(\w+)\-svg-icons/,
                    );

                    if (matches) {
                        return matches[1] + '-icons';
                    }

                    return null;
                },
            },
        },
    },
});
