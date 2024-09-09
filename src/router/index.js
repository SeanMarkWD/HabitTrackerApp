import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/day/:date',
      name: 'DayView',
      component: MainView,
    },
    {
      path: '/',
      redirect: () => {
        const today = new Date().toISOString().split('T')[0];
        return `/day/${today}`;
      },
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
