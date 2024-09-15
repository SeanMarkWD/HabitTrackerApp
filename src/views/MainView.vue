<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AddHabitForm from '../components/AddHabitForm.vue';
import HabitItem from '../components/HabitItem.vue';

const router = useRouter();

onMounted(() => {
  const today = new Date().toISOString().split('T')[0];
  router.push(`/day/${today}`);
});

const date = ref(router.currentRoute.value.params.date);
const habits = ref([]);
console.log(date.value);

watch(
  () => router.currentRoute.value.params.date,
  newDate => {
    date.value = newDate;
    loadHabits();
  },
  { immediate: true },
);

function generatePast7Days() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

const past7Days = ref(generatePast7Days());

function loadHabits() {
  const storedHabits = JSON.parse(localStorage.getItem(date.value)) || [];
  habits.value = storedHabits;
}

function saveHabits(updatedHabits) {
  localStorage.setItem(date.value, JSON.stringify(updatedHabits));
  habits.value = updatedHabits; // Update state
}

function addHabitToList(newHabit) {
  const updatedHabits = [...habits.value, newHabit];
  saveHabits(updatedHabits);
}

function updateHabitCompletion(habitName, isCompleted) {
  const updatedHabits = habits.value.map(habit =>
    habit.name === habitName ? { ...habit, isCompleted } : habit,
  );
  saveHabits(updatedHabits);
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

loadHabits();
</script>

<template>
  <div class="main-view">
    <header>
      <nav class="nav-buttons">
        <button
          v-for="day in past7Days"
          :key="day"
          :class="{ 'selected-date': day === date }"
          @click="navigateToDay(day)"
        >
          <span class="day-name">{{ formatDayName(day) }}</span>
          <span class="day-number">{{ formatDayNumber(day) }}</span>
        </button>
      </nav>
      <div class="habit-adder-container">
        <AddHabitForm @habit-added="addHabitToList" />
        <button class="manage-habits-button" @click="navigateToManageHabits">Manage Habits</button>
      </div>
    </header>
    <main>
      <div class="habit-list">
        <ul>
          <HabitItem
            v-for="habit in habits"
            :key="habit.name"
            :habit-name="habit.name"
            :is-completed="habit.isCompleted"
            :icon-name="habit.icon"
          />
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

.manage-habits-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.manage-habits-button:hover {
  background-color: #0056b3;
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
