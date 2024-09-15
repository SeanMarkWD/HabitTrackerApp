<script setup>
import { useRouter } from 'vue-router';
import AddHabitForm from '../components/AddHabitForm.vue';

const router = useRouter();

function onHabitAdded(habit) {
  router.push('/');
}
</script>

<template>
  <div class="add-habit-view">
    <h2>Add a New Habit</h2>
    <AddHabitForm @habit-added="onHabitAdded" />
  </div>
</template>

<style scoped>
.add-habit-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}
</style>
