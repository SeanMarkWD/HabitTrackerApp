<script setup>
import IconComponent from './IconComponent.vue';

const props = defineProps({
  categoryName: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="category-item">
    <IconComponent :iconName="iconName" />
    <span>{{ categoryName }}</span>
  </div>
</template>

<style scoped>
.category-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
