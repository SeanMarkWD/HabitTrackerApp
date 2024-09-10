<script setup>
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
});

const iconPath = new URL(`../assets/icons/${props.iconName}.svg`, import.meta.url).href;
</script>

<template>
  <img :src="iconPath" alt="icon" class="icon" />
</template>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
}
</style>
