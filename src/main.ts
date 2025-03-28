import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { createApp } from 'vue';

import App from './App.vue';
import './assets/main.css';
import router from './router';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';

library.add(fas, far);

const app = createApp(App);

app.use(router);
app.use(hljsVuePlugin);

app.mount('#app');
