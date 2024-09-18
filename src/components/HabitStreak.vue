<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { calculateStreak } from '../store/streakStore';

const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
});

const router = useRouter();
const streak = ref(0);

function updateStreak() {
  streak.value = props.isCompleted
    ? calculateStreak(props.habitName, router.currentRoute.value.params.date) + 1
    : 0;
}

onMounted(() => {
  updateStreak();
});

watch(() => props.isCompleted, updateStreak);
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
