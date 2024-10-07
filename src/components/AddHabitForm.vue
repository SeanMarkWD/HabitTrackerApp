<script setup>
import { ref } from 'vue';
import CategoryComponent from './CategoryComponent.vue';
import { generateNext7Days } from '../store/dateStore';

const newHabitName = ref('');
const selectedCategory = ref(null);

const categories = [
  { name: 'Workout', icon: 'workout' },
  { name: 'Diet', icon: 'diet' },
  { name: 'Music', icon: 'music' },
  { name: 'Art & Design', icon: 'art' },
  { name: 'Travelling', icon: 'travel' },
  { name: 'Read Book', icon: 'book' },
  { name: 'Gaming', icon: 'gamepad' },
  { name: 'Self Improvement', icon: 'meditation' },
];

const emit = defineEmits(['habit-added']);

function selectCategory(categoryName) {
  selectedCategory.value = categoryName;
}

function addHabit() {
  if (newHabitName.value && selectedCategory.value) {
    const newHabit = {
      name: newHabitName.value,
      category: selectedCategory.value,
      icon: categories.find(category => category.name === selectedCategory.value).icon,
      isCompleted: false,
    };

    emit('habit-added', newHabit);

    const next7Days = generateNext7Days();

    next7Days.forEach(day => {
      const existingHabits = JSON.parse(localStorage.getItem(day)) || [];
      existingHabits.push(newHabit);
      localStorage.setItem(day, JSON.stringify(existingHabits));
    });

    newHabitName.value = '';
    selectedCategory.value = null;
  }
}
</script>

<template>
  <form @submit.prevent="addHabit">
    <div class="habit-selection">
      <h2>Choose Habit</h2>
      <p>Choose your daily habit</p>
      <div class="habit-grid">
        <label for="habitName" />
        <input
          id="habitName"
          v-model="newHabitName"
          type="text"
          placeholder="Enter habit name"
          required
        />
      </div>
    </div>

    <div class="category-selection category-tiles">
      <h3>Select Category:</h3>
      <div class="categories">
        <CategoryComponent
          v-for="category in categories"
          :key="category.name"
          class="habit-option"
          :category-name="category.name"
          :icon-name="category.icon"
          :class="{ selected: selectedCategory === category.name }"
          @click="selectCategory(category.name)"
        />
      </div>
    </div>
    <button @click="addHabit">Add Habit</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

h3 {
  color: #9e6240;
}

.habit-selection {
  text-align: center;
  padding: 20px;
  color: #9e6240;
  width: 100%;
}

.habit-grid {
  width: 100%;
}

.habit-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 120px;
  height: 120px;
}

.habit-option img {
  width: 40px;
  height: 40px;
}

.habit-option.selected {
  border: 2px solid #007bff;
}

.categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns layout */
  gap: 10px;
  justify-items: center;
}

.category-selection {
  text-align: center;
  margin-top: 20px;
}

.category-tiles {
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.selected {
  border: 2px solid #42b983;
  background-color: #f0f8ff;
}

input {
  flex: 1;
  margin-right: 10px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

@media (min-width: 600px) {
  .category-tiles {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .main-view {
    flex-direction: row;
  }
}
</style>
