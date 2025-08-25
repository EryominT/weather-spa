import type { Component } from 'vue';

import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';
import { createCustomTheme } from '@/shared/config/theme';
import App from './App.vue';

import router from './router';

import '@/shared/styles/index.scss';

const app = createApp(App as Component);

app.directive('tooltip', Tooltip);
app.use(ToastService);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: createCustomTheme(),
  },
});

app.mount('#app');
