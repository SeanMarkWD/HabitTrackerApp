<script setup>
const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
});

const emit = defineEmits(['updated:isCompleted']);

function toggleCheckbox() {
  emit('update:isCompleted', !props.isCompleted);
}
</script>

<template>
  <label>
    <input type="checkbox" :checked="isCompleted" @change="toggleCheckbox" />
    {{ habitName }}
  </label>
</template>
