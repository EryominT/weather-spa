import { createRouter, createWebHistory } from 'vue-router';

const baseUrl = import.meta.env.BASE_URL || '/';

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      component: async () => import('@/app/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '/',
          name: 'mainPage',
          component: async () => import('@/pages/MainPage'),
        },
        {
          path: '/weather-for-week',
          name: 'weatherForWeek',
          component: async () => import('@/pages/WeatherForWeek'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: async () => import('@/pages/NotFound'),
    },
  ],
});

export default router;
