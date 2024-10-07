<script setup>
import { ref } from 'vue'
import {API_URL} from "@/config.js";

const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await fetch(`${API_URL}/Login?identifier=${username.value}&password=${password.value}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await response.json();
    console.log('User data:', userData);
    // Handle the user data as needed
  } catch (error) {
    console.error('There was a problem with the login request:', error);
  }
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

