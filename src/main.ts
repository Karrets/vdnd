import '@/assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { Inkline, components } from '@inkline/inkline';

import '@/css/variables/index.scss';
import '@inkline/inkline/css/index.scss';
import '@inkline/inkline/css/utilities.scss';

const app = createApp(App).use(Inkline, { components });

app.use(createPinia());
app.use(router);

app.mount('#app');
