<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { calculateStreak, useStreak } from '../store/streakStore';

const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
});

const router = useRouter();
const streak = useStreak();

function updateStreak() {
  streak.value = props.isCompleted
    ? calculateStreak(props.habitName, router.currentRoute.value.params.date) + 1
    : 0;
}

onMounted(() => {
  calculateStreak(props.habitName, props.isCompleted, new Date());
});

watch(
  () => props.isCompleted,
  () => {
    calculateStreak(props.habitName, props.isCompleted, new Date());
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
