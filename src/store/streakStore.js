import { ref } from 'vue';

const streak = ref(0);

export function calculateStreak() {
  let currentStreak = 0;
  const date = new Date(currentDate);

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
