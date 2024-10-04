<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HabitItem from '../components/HabitItem.vue';
import HabitStreak from '../components/HabitStreak.vue';
import { generatePast7Days, generateNext7Days } from '../store/dateStore';

const router = useRouter();
const date = ref(router.currentRoute.value.params.date);
const today = ref(new Date().toISOString().split('T')[0]);

const past7Days = ref([]);
const next7Days = ref([]);
const habits = ref([]);

function loadHabits() {
  const storedHabits = JSON.parse(localStorage.getItem(date.value)) || [];
  habits.value = storedHabits;
}

onMounted(() => {
  loadHabits();
  past7Days.value = generatePast7Days();
  next7Days.value = generateNext7Days();
});

watch(
  () => router.currentRoute.value.params.date,
  newDate => {
    date.value = newDate;
    loadHabits();
  },
  { immediate: true },
);

function saveHabits(updatedHabits) {
  localStorage.setItem(date.value, JSON.stringify(updatedHabits));
  habits.value = updatedHabits;
}

function handleHabitCompletion(habit, newStatus) {
  habit.isCompleted = newStatus;
  saveHabits([...habits.value]);
}

function navigateToAddHabit() {
  router.push('/add-habit');
}

function navigateToDay(day) {
  router.push(`/day/${day}`);
}

function navigateToManageHabits() {
  router.push({ name: 'HabitListView', query: { habits: JSON.stringify(habits.value) } });
}

function formatDayName(day) {
  const date = new Date(day);
  return date.toLocaleDateString('en-us', { weekday: 'short' });
}

function formatDayNumber(day) {
  const date = new Date(day);
  return date.getDate();
}
</script>

<template>
  <div class="main-view">
    <header>
      <nav class="nav-buttons">
        <button
          v-for="day in past7Days"
          :key="day"
          :class="{ 'selected-date': day === date, 'today-date': day === today }"
          @click="navigateToDay(day)"
        >
          <span class="day-name">{{ formatDayName(day) }}</span>
          <span class="day-number">{{ formatDayNumber(day) }}</span>
        </button>
      </nav>
      <div class="habit-adder-container">
        <button class="habits-button" @click="navigateToAddHabit">Add New Habit</button>
        <button class="habits-button" @click="navigateToManageHabits">Manage Habits</button>
      </div>
    </header>
    <main>
      <div class="habit-list">
        <ul>
          <li v-for="habit in habits" :key="habit.name">
            <HabitItem
              :key="habit.name"
              :habit-name="habit.name"
              :is-completed="habit.isCompleted"
              :icon-name="habit.icon"
              @update:is-completed="handleHabitCompletion(habit, $event)"
            />
            <HabitStreak
              v-if="habit.name"
              :habit-name="habit.name"
              :is-completed="habit.isCompleted"
            />
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.habit-adder-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the input and tiles */
  width: 100%;
}

.habits-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.habits-button:hover {
  background-color: #0056b3;
}

.selected-date {
  background-color: #007bff;
  color: #fff;
}

.today-date {
  background-color: #ffa500; /* Highlight today's date with orange */
  color: #fff;
}

@media (width >= 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: 1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
