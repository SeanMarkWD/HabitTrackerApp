import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import HabitListView from '../views/HabitListView.vue';

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
      path: '/manage-habits',
      name: 'HabitListView',
      props: route => ({ habits: JSON.parse(route.query.habits || '[]') }),
      component: HabitListView,
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
