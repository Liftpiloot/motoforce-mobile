<script setup>
import { ref } from 'vue'
import {API_URL} from "@/config.js";

const password = ref('')
const email = ref('')
const name = ref('')
const errorMessage = ref('')
const loading = ref(false)

const register = async () => {
  errorMessage.value = '';
  loading.value = true;
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
    if (response.status === 409) {
      errorMessage.value = 'Username or email already exists';
      return;
    }
    if (!response.ok) {
      throw new Error(await response.text());
    }
    await login();
  } catch (error) {
    console.error('There was a problem with the register request:', error);
    errorMessage.value = 'An error occurred. PLease try again';
  } finally {
    loading.value = false;
  }
};

const login = async () => {
  try {
    const response = await fetch(`${API_URL}/Login?identifier=${name.value}&password=${password.value}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await response.json();
    localStorage.setItem('user', JSON.stringify(userData));
    window.location.href = '/dashboard';
  } catch (error) {
    errorMessage.value = 'Your account was created, but there was a problem logging in. Please try logging in manually.';
  }
};

</script>

<template>
  <div class="window">
  <div :class="['moto-force-icon', {loading}]">
    <img src="../components/icons/moto-force-icon.svg" alt="Moto Force Icon" />
  </div>
  <div class="register-container">
    <div class="register-form">
      <div class="register-title">
        <h1>Create your account</h1>
      </div>
    <form @submit.prevent="register" class="register-form">
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
      <button type="submit" class="register-button">Sign up</button>
    </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
  </div>
</template>

<style scoped lang="scss">

.window {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  color: var(--Text-color);
  font-weight: 800;
}

.moto-force-icon {
  display: flex;
  width: 22.5rem;
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
.moto-force-icon.loading img {
  animation: neon 5s infinite;
}

@keyframes neon {
  0% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(360deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}

.register-container{
  display: flex;
  padding: 3.125rem 0.625rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.register-form{
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
}

.register-title{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  color: var(--Text-color);
  text-align: center;
  width: 100%;
}

.name-div, .email-div, .password-div{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
}

input {
  height: 1.5625rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--Text-color, #E5E5E5);
  padding: 0.625rem;
  background: var(--Background-color, #FFFFFF);
  color: var(--Text-color);
}

.error-message{
  color: var(--Text-color);
  margin-top: 1rem;
}

.register-button {
  all: unset;
  margin-top: 1rem;
  display: flex;
  width: 100%;
  padding: 0.25rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1rem;
  background: var(--Primary-solid, #4F15B4);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  color: var(--Text-color);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.register-button:active {
  transform: translateY(2px);
}



</style>