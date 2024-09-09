<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
});

const streak = ref(0);
const router = useRouter();

function calculateStreak() {
  let currentStreak = 0;
  const currentDate = new Date(router.currentRoute.value.params.date);

  while (true) {
    currentDate.setDate(currentDate.getDate() - 1);
    const previousDate = currentDate.toISOString().split('T')[0];
    const previousHabits = JSON.parse(localStorage.getItem(previousDate)) || [];
    const previousHabit = previousHabits.find(h => h.name === props.habitName);

    if (!previousHabit || !previousHabit.isCompleted) {
      break;
    }

    currentStreak += 1;
  }

  if (props.isCompleted) {
    streak.value = currentStreak + 1;
  } else {
    streak.value = 0;
  }
}

onMounted(() => {
  calculateStreak();
});

watch(() => props.isCompleted, calculateStreak);
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
