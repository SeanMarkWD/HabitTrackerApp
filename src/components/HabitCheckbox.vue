<script setup>
import { ref } from 'vue';

const { habitName, isCompleted } = defineProps({
  habitName: String,
  isCompleted: Boolean,
});

const emit = defineEmits(['update:isCompleted']);

function toggleCheckbox() {
  emit('update:isCompleted', !isCompleted);
}
</script>

<template>
  <label :class="{ 'checked-habit': isCompleted, 'unchecked-habit': !isCompleted }">
    <input type="checkbox" :checked="isCompleted" @change="toggleCheckbox" />
    {{ habitName }}
  </label>
</template>

<style scoped>
.checked-habit {
  text-decoration: line-through;
  color: green;
}

.unchecked-habit {
  text-decoration: none;
  color: black;
}
</style>
