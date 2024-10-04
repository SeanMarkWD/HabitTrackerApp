<script setup>
import { ref } from 'vue';

const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
});

const emit = defineEmits(['update:isCompleted']);

function toggleCheckbox() {
  emit('update:isCompleted', !props.isCompleted);
}
</script>

<template>
  <label :class="{ 'checked-habit': props.isCompleted, 'unchecked-habit': !props.isCompleted }">
    <input type="checkbox" :checked="props.isCompleted" @change="toggleCheckbox" />
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
