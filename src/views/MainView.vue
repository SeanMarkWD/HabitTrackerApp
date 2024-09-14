<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import AddHabitForm from '../components/AddHabitForm.vue';
import HabitItem from '../components/HabitItem.vue';

const router = useRouter();
const past7Days = ref(generatePast7Days());
const habits = ref([]);

const date = ref(router.currentRoute.value.params.date);

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

function navigateToDay(day) {
  router.push(`/day/${day}`);
}

function formatDayName(day) {
  const date = new Date(day);
  return date.toLocaleDateString('en-us', { weekday: 'short' });
}

function formatDayNumber(day) {
  const date = new Date(day);
  return date.getDate();
}

function loadHabits() {
  const storedHabits = JSON.parse(localStorage.getItem(date.value)) || habits.value;
  if (storedHabits && storedHabits.length > 0) {
    habits.value = storedHabits;
  } else {
    habits.value = [];
  }
}

function addHabitToList(newHabit) {
  habits.value.push(newHabit);
  saveHabits(date.value, habits.value);

  const currentDate = new Date(date.value);
  past7Days.value.forEach(day => {
    const dayDate = new Date(day);
    if (dayDate >= currentDate) {
      let dayHabits = JSON.parse(localStorage.getItem(day)) || [];
      if (!dayHabits.find(habit => habit.name === newHabit.name)) {
        dayHabits.push(newHabit);
        saveHabits(day, dayHabits);
      }
    }
  });
}

function saveHabits(date, habits) {
  localStorage.setItem(date, JSON.stringify(habits));
}

loadHabits();
</script>

<template>
  <div class="main-view">
    <header>
      <nav class="nav-buttons">
        <button
          @click="navigateToDay(day)"
          v-for="day in past7Days"
          :key="day"
          :class="{ 'selected-date': day === date }"
        >
          <span class="day-name">{{ formatDayName(day) }}</span>
          <span class="day-number">{{ formatDayNumber(day) }}</span>
        </button>
      </nav>
      <AddHabitForm @habit-added="addHabitToList" />
    </header>
    <main>
      <div class="habit-list">
        <ul>
          <HabitItem
            v-for="habit in habits"
            :key="habit.name"
            :habitName="habit.name"
            :isCompleted="habit.isCompleted"
            :iconName="habit.icon"
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
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
