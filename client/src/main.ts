import '@/assets/main.scss';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import { Inkline, components } from '@inkline/inkline';

import '@/css/inkline_css/index.scss';
import '@inkline/inkline/css/index.scss';
import '@inkline/inkline/css/utilities.scss';

const app = createApp(App).use(Inkline, { components });

app.use(router);

app.mount('#app');
