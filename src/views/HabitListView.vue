<script setup>
import HabitItem from '../components/HabitItem.vue';
import HabitManager from '../components/HabitManager.vue';

const props = defineProps({
  habits: Array,
});

const emit = defineEmits(['update-habits']);

function updateHabitStatus(habitName, isCompleted) {
  const updatedHabits = props.habits.map(habit =>
    habit.name === habitName ? { ...habit, isCompleted } : habit,
  );
  emit('update-habits', updatedHabits);
}

function editHabit(newHabitName, oldHabitName) {
  const updatedHabits = props.habits.map(habit =>
    habit.name === oldHabitName ? { ...habit, name: newHabitName } : habit,
  );
  emit('update-habits', updatedHabits);
}

function stopHabit(habitName) {
  const currentDate = new Date().toISOString().split('T')[0];
  const updatedHabits = props.habits.filter(habit => habit.name !== habitName);
  emit('update-habits', updatedHabits);

  const futureDates = past7Days.value.filter(day => new Date(day) >= new Date(currentDate));
  futureDates.forEach(day => {
    let dayHabits = JSON.parse(localStorage.getItem(day)) || [];
    dayHabits = dayHabits.filter(habit.name !== habitName);
    saveHabits(day, dayHabits);
  });
}

function deleteHabit(habitName) {
  const updatedHabits = props.habits.filter(habit => habit.name !== habitName);
  emit('update-habits', updatedHabits);

  past7Days.value.forEach(day => {
    let dayHabits = JSON.parse(localStorage.getItem(day)) || [];
    dayHabits = dayHabits.filter(habit => habit.name !== habitName);
    saveHabits(day, dayHabits);
  });
}
</script>

<template>
  <div class="habit-list-view">
    <ul class="habit-list card flex-column">
      <li v-for="(habit, index) in habits" :key="habit.name + index" class="habit-name">
        <div class="habit-details">
          <HabitItem
            :habitName="habit.name"
            :isCompleted="habit.isCompleted"
            :iconName="habit.category"
            @update:isCompleted="updateHabitStatus(habit.name, $event)"
          />
          <HabitManager
            :habitName="habit.name"
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
