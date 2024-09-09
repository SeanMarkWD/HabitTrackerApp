<script setup>
const props = defineProps({
  categoryName: String,
  iconName: String,
});

// import WorkoutIcon from '../assets/icons/run-svgrepo-com.svg';
// import DietIcon from '../assets/icons/diet-juice-svgrepo-com.svg';
// import MusicIcon from '../assets/icons/music-box-svgrepo-com.svg';
// import ArtIcon from '../assets/icons/paint-brush-art-svgrepo-com.svg';
// import TravelIcon from '../assets/icons/travel-svgrepo-com.svg';
// import BookIcon from '../assets/icons/book-closed-svgrepo-com.svg';
// import GamepadIcon from '../assets/icons/gamepad-svgrepo-com.svg';
// import MeditationIcon from '../assets/icons/meditation-svgrepo-com.svg';

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
