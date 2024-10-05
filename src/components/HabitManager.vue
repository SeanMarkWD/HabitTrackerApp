<script setup>
import { ref } from 'vue';

const props = defineProps({
  habitName: String,
});

const emit = defineEmits(['edit-habit', 'stop-habit', 'delete-habit']);

const isEditing = ref(false);
const newHabitName = ref(props.habitName);

function startEditMode() {
  isEditing.value = true;
}

function saveEdit() {
  if (newHabitName.value.trim()) {
    emit('edit-habit', newHabitName.value, props.habitName);
    isEditing.value = false;
  }
}

function cancelEdit() {
  newHabitName.value = props.habitName;
  isEditing.value = false;
}

function stopHabit() {
  emit('stop-habit', props.habitName);
}

function deleteHabit() {
  emit('delete-habit', props.habitName);
}
</script>

<template>
  <div class="habit-manager">
    <div v-if="isEditing">
      <input v-model="newHabitName" placeholder="Edit habit name" />
      <button @click="saveEdit">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>

    <div v-else class="habit-actions">
      <button @click="startEditMode">Edit</button>
      <button @click="stopHabit">Stop</button>
      <button @click="deleteHabit">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.habit-manager {
  display: flex;
  flex-direction: column;
}

.habit-action {
  display: flex;
  gap: 5px;
}

.habit-manager button {
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 2px 5px;
}
</style>
