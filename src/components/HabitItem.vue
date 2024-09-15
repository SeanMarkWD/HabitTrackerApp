<script setup>
import { ref, computed, onMounted } from 'vue';
import IconComponent from './IconComponent.vue';
import HabitCheckbox from './HabitCheckbox.vue';

const props = defineProps({
  habitName: String,
  isCompleted: Boolean,
  iconName: String,
});

const isCompleted = ref(props.isCompleted);

const iconPath = computed(
  () => new URL(`../assets/icons/${props.iconName}.svg`, import.meta.url).href,
);
</script>

<template>
  <li class="habit-item">
    <label>
      <IconComponent :icon-name="iconName" />
      <span>{{ habitName }}</span>
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
