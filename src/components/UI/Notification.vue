<!-- src/components/Notification.vue -->
<template>
  <div v-if="notifications.length" class="notification-container">
    <div v-for="(notification, index) in notifications" :key="index" class="notification">
      {{ notification }}
      <button @click="removeNotification(index)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useWebSocket } from '@/services/websocketService';
import {getUser} from "@/scripts/getUser.ts";

const user = getUser();
const { notifications } = useWebSocket(user.id);

const removeNotification = (index) => {
  notifications.value.splice(index, 1);
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.notification {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
}

button {
  background-color: transparent;
  border: none;
  color: #721c24;
  cursor: pointer;
  font-weight: bold;
}
</style>