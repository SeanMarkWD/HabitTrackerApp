<script setup>
import { computed } from 'vue';
import IconComponent from './IconComponent.vue';
import HabitCheckbox from './HabitCheckbox.vue';

const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
  iconName: String,
});

const emit = defineEmits(['update:isCompleted']);

const iconPath = computed(
  () => new URL(`../assets/icons/${props.iconName}.svg`, import.meta.url).href,
);

function handleCheckboxChange(newStatus) {
  emit('update:isCompleted', newStatus);
}
</script>

<template>
  <li class="habit-item">
    <label>
      <IconComponent :icon-name="iconName" />
      <HabitCheckbox
        :habit-name="habitName"
        :is-completed="isCompleted"
        @update:is-completed="handleCheckboxChange"
      />
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
