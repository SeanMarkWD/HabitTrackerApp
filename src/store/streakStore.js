import { ref } from 'vue';
import { generatePast7Days } from './dateStore';

const streak = ref(0);

export function calculateStreak(habitName, isCompleted, currentDate) {
  let currentStreak = 0;
  const date = new Date(currentDate);

  const pastDays = generatePast7Days();

  for (let i = 0; i < pastDays.length; i++) {
    const previousDate = pastDays[i];
    const previousHabits = JSON.parse(localStorage.getItem(previousDate)) || [];
    const previousHabit = previousHabits.find(h => h.name === habitName);

    if (!previousHabit || !previousHabit.isCompleted) {
      break;
    }

    currentStreak += 1;
  }

  if (isCompleted) {
    streak.value = currentStreak + 1;
  } else {
    streak.value = 0;
  }
}

export function useStreak() {
  return streak;
}
