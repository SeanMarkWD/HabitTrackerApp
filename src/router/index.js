import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import HabitListView from '../views/HabitListView.vue';
import AddHabitView from '../views/AddHabitView.vue';

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
      path: '/add-habit',
      name: 'AddHabit',
      component: AddHabitView,
    },
    {
      path: '/manage-habits',
      name: 'HabitListView',
      props: route => {
        try {
          // Decode the URL-encoded string and then parse it as JSON
          return { habits: JSON.parse(decodeURIComponent(route.query.habits || '[]')) };
        } catch (e) {
          console.error('Failed to parse habits:', e);
          return { habits: [] };
        }
      },
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
