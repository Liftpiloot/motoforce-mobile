<script setup>
import { ref } from 'vue'
import {API_URL} from "@/config.js";

const password = ref('')
const email = ref('')
const name = ref('')

const register = async () => {
  try {
    const response = await fetch(`${API_URL}/Register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });
    if (!response.ok) {
      throw new Error(response.text());
    }
    const userData = await response.json();
    console.log('User data:', userData);
    // Handle the user data as needed
  } catch (error) {
    console.error('There was a problem with the register request:', error);
  }
};

</script>

<template>
  <div class="moto-force-icon">
    <img src="../components/icons/moto-force-icon.svg" alt="Moto Force Icon" />
  </div>
  <div class="register-container">
    <div class="register-form">
      <div class="register-title">
        <h1>Create your account</h1>
      </div>
    <form @submit.prevent="register">
      <div class="name-div">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="email-div">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="password-div">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="register-button">Register</button>
    </form>
    </div>
  </div>
</template>

<style scoped lang="scss">

.moto-force-icon {
  display: flex;
  width: 22.5rem;
  height: 12.75rem;
  padding: 0.75rem 0rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;

  img {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
  }
}

.register-container{
  display: flex;
  width: 22.5rem;
  height: 37.25rem;
  padding: 3.125rem 0.625rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.register-form{
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
}

.register-title{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  color: var(--Text-color);
}

.name-div, .email-div, .password-div{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
}

input {
  height: 1.5625rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--Text-color, #E5E5E5);
  padding: 0.625rem;

  background: var(--Background-color, #FFFFFF);
}

.register-button {
  display: flex;
  width: 9.6875rem;
  padding: 0.25rem 1.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  all: unset;
  border-radius: 1rem;
  background: var(--Primary-solid, #4F15B4);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  color: var(--Text-color);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
}


</style>