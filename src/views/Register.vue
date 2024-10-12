<script setup>
import {ref} from 'vue'
import {API_URL} from "@/config.js";

const password = ref('')
const email = ref('')
const name = ref('')
const errorMessage = ref('')
const loading = ref(false)
import InputField from "@/components/UI/InputField.vue";
import StandardButton from "@/components/UI/StandardButton.vue";

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
      <img src="../components/icons/moto-force-icon.svg" alt="Moto Force Icon"/>
    </div>
    <div class="register-container">
      <div class="register-title">
        <h1>Create your account</h1>
      </div>
      <form @submit.prevent="register" class="register-form">
        <InputField v-model="name" :label="true" :label-text="'Name:'"/>
        <InputField v-model="email" :label="true" :label-text="'Email:'"/>
        <InputField v-model="password" :label="true" :label-text="'Password:'" type="password"/>
        <StandardButton :type="'positive'" :content="'Sign up'"></StandardButton>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
    <div class="login-container">
      <div>Already have an account?</div>
      <router-link to="/login" class="login-text">Login</router-link>
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
  height: 100vh;
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

.register-container {
  display: flex;
  padding: 3.125rem 0.625rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  max-width: 22.5rem;
}

.register-form {
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
}

.register-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  color: var(--Text-color);
  text-align: center;
  width: 100%;
}

.error-message {
  color: var(--Text-color);
  margin-top: 1rem;
}

.login-container {
  display: flex;
  flex-direction: row;
}

.login-text {
  all: unset;
  background: -webkit-linear-gradient(68deg, #2200AC 11.4%, #7F2CBC 50.14%, #C900B8 88.87%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  margin-left: 0.3125rem;
  cursor: pointer;
}

.login-text:hover {
  text-decoration: underline;
}


</style>