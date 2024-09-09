<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HabitStreak from './HabitStreak.vue';

const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
  iconName: String,
});

const isCompleted = ref(props.isCompleted);
const router = useRouter();

function saveHabits() {
  const date = router.currentRoute.value.params.date;
  const currentHabits = JSON.parse(localStorage.getItem(date)) || [];
  const updatedHabits = currentHabits.map(habit =>
    habit.name === props.habitName ? { ...habit, isCompleted: isCompleted.value } : habit,
  );
  localStorage.setItem(date, JSON.stringify(updatedHabits));
}

const iconPath = computed(() => {
  return new URL(`../assets/icons/${props.iconName}.svg`, import.meta.url).href;
});
console.log(props.iconName);
onMounted(() => {
  console.log('iconName:', props.iconName);
});
</script>

<template>
  <li class="habit-item">
    <label>
      <img :src="iconPath" alt="icon" class="icon" />
      <input type="checkbox" v-model="isCompleted" @change="saveHabits" />
      <span>{{ habitName }}</span>
      <HabitStreak :habitName="habitName" :isCompleted="isCompleted" />
    </label>
  </li>
</template>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.habit-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.habit-item label {
  display: flex;
  align-items: center;
}

.habit-item span {
  margin-left: 8px;
}

.habit-item .streak {
  margin-left: auto;
  color: gray;
  font-size: 0.9em;
}
</style>
