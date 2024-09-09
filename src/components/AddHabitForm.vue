<script setup>
import { ref } from 'vue';
import CategoryComponent from './CategoryComponent.vue';

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
      isCompleted: false,
    };

    emit('habit-added', newHabit);

    newHabitName.value = '';
    selectedCategory.value = null;
  } else {
    alert('Please enter a habit name and select a category.');
  }
}
</script>

<template>
  <form @submit.prevent="addHabit">
    <div>
      <label for="habitName">New Habit</label>
      <input
        type="text"
        v-model="newHabitName"
        id="habitName"
        placeholder="Enter habit name"
        required
      />
    </div>

    <div class="category-selection">
      <h3>Select Category:</h3>
      <div class="categories">
        <CategoryComponent
          v-for="category in categories"
          :key="category.name"
          :categoryName="category.name"
          :iconName="category.icon"
          @click="selectCategory(category.name)"
          :class="{ selected: selectedCategory === category.name }"
        />
      </div>
    </div>
    <button type="submit">Add Habit</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  margin-bottom: 20px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.category-selection {
  margin-top: 20px;
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
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
