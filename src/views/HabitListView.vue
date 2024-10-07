<script setup>
import { ref } from 'vue';
import HabitItem from '../components/HabitItem.vue';
import HabitManager from '../components/HabitManager.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const query = router.currentRoute.value.query;

const props = defineProps({
  habits: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(['update-habits']);

const selectedDate = ref(query.date || new Date().toISOString().split('T')[0]);

function loadHabitsForDate() {
  const days = JSON.parse(localStorage.getItem('days')) || {};
  return days[selectedDate.value] || [];
}

const localHabits = ref(props.habits, loadHabitsForDate());

function generatePast7Days() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
    localStorage.setItem('days', JSON.stringify(localHabits.value));
  }
  return days;
}

const past7Days = ref(generatePast7Days());

function saveHabitsToLocalStorage() {
  console.log('Saving habits to localStorage:', localHabits.value);
  const days = JSON.parse(localStorage.getItem('days')) || {};
  days[selectedDate.value] = localHabits.value;
  localStorage.setItem('days', JSON.stringify(localHabits.value));
}

function updateHabitStatus(habitName, isCompleted) {
  const updatedHabits = localHabits.value.map(habit =>
    habit.name === habitName ? { ...habit, isCompleted } : habit,
  );
  localHabits.value = updatedHabits;
  emit('update-habits', updatedHabits);
  saveHabitsToLocalStorage();
}

function editHabit(newHabitName, oldHabitName) {
  const updatedHabits = localHabits.value.map(habit =>
    habit.name === oldHabitName ? { ...habit, name: newHabitName } : habit,
  );
  localHabits.value = updatedHabits;
  emit('update-habits', localHabits.value);
  saveHabitsToLocalStorage();
}

function stopHabit(habitName) {
  const currentDate = new Date().toISOString().split('T')[0];
  const updatedHabits = props.habits.filter(habit => habit.name !== habitName);
  localHabits.value = updatedHabits;
  emit('update-habits', updatedHabits);
  saveHabitsToLocalStorage();

  const futureDates = past7Days.value.filter(day => new Date(day) >= new Date(currentDate));
  futureDates.forEach(day => {
    let dayHabits = JSON.parse(localStorage.getItem(day)) || [];
    dayHabits = dayHabits.filter(habit => habit.name !== habitName);
    localStorage.setItem(day, JSON.stringify(dayHabits));
  });
}

function deleteHabit(habitName) {
  const updatedHabits = localHabits.value.filter(habit => habit.name !== habitName);
  localHabits.value = updatedHabits;
  emit('update-habits', updatedHabits);
  saveHabitsToLocalStorage();

  past7Days.value.forEach(day => {
    let dayHabits = JSON.parse(localStorage.getItem(day)) || [];
    dayHabits = dayHabits.filter(habit => habit.name !== habitName);
    localStorage.setItem(day, JSON.stringify(dayHabits));
  });
}
</script>

<template>
  <div class="habit-list-view">
    <h2>Manage Your Habits for {{ selectedDate }}</h2>
    <ul class="habit-list card flex-column">
      <li v-for="(habit, index) in habits" :key="habit.name + index">
        <span>{{ habit.name }}</span>
        <div class="habit-item">
          <HabitItem
            :habit-name="habit.name"
            :is-completed="habit.isCompleted"
            :icon-name="habit.category"
            @update:is-completed="updateHabitStatus(habit.name, $event)"
          />
          <HabitManager
            :habit-name="habit.name"
            @edit-habit="editHabit"
            @stop-habit="stopHabit"
            @delete-habit="deleteHabit"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.habit-list-view {
  margin: 20px 0;
  color: #9e6240;
}

.habit-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.habit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
