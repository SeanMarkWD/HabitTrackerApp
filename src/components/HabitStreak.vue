<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { calculateStreak, useStreak } from '../store/streakStore';

const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
});

const route = useRoute();
const streak = useStreak();

onMounted(() => {
  calculateStreak(props.habitName, props.isCompleted, new Date(route.params.date));
});

watch(
  () => props.isCompleted,
  newStatus => {
    calculateStreak(props.habitName, newStatus, new Date(route.params.date));
  },
);
</script>

<template>
  <span class="habit-streak"> Streak: {{ streak }} </span>
</template>

<style scoped>
.habit-streak {
  font-weight: bold;
  color: green;
}
</style>
