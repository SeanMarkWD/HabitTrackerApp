<script setup>
const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
});

const emit = defineEmits(['update:isCompleted']); // Fix: Change to 'update:isCompleted'

function toggleCheckbox() {
  emit('update:isCompleted', !props.isCompleted); // Emit the correct event name
}
</script>

<template>
  <label>
    <input type="checkbox" :checked="isCompleted" @change="toggleCheckbox" />
  </label>
</template>
