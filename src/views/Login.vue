<script setup>
import {onMounted, ref} from 'vue'
import {API_URL} from "@/config.js";
import InputField from "@/components/UI/InputField.vue";
import StandardButton from "@/components/UI/StandardButton.vue";
import Logo from "@/components/UI/Logo.vue";

const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const errorMessage = ref('')
const loading = ref(false)

const login = async () => {
  errorMessage.value = '';
  loading.value = true;
  try {
    const response = await fetch(`${API_URL}/Login?identifier=${username.value}&password=${password.value}`);
    if (response.status === 404) {
      errorMessage.value = 'Username or password is incorrect';
      return;
    }
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const userData = await response.json();
    console.log('User data:', userData);

    if (rememberMe.value) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    window.location.href = '/dashboard';
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (localStorage.getItem('user')) {
    window.location.href = '/dashboard';
  }
});
</script>

<template>
  <div class="window">
    <Logo :loading="loading"/>
    <div class="login-container">
        <div class="login-title">
          <h1>Login</h1>
        </div>
        <form @submit.prevent="login" class="login-form">
          <InputField v-model="username" :label="true" :label-text="'Name/Email:'"/>
          <InputField v-model="password" :label="true" :label-text="'Password:'" type="password"/>
          <div class="remember-me">
            <input type="checkbox" id="rememberMe" v-model="rememberMe"/>
            <label for="rememberMe">Remember me</label>
          </div>
          <StandardButton :type="'positive'" :content="'Login'"></StandardButton>
        </form>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
    <div class="register-container">
      <div>Don't have an account yet?</div>
      <router-link to="/register" class="register-text">Register</router-link>
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

.login-container {
  display: flex;
  padding: 3.125rem 0.625rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  max-width: 22.5rem;
}

.login-form {
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

.login-title {
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

.register-container {
  display: flex;
  flex-direction: row;
}

.register-text {
  all:unset;
  background: -webkit-linear-gradient(68deg, #2200AC 11.4%, #7F2CBC 50.14%, #C900B8 88.87%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  margin-left: 0.3125rem;
  cursor: pointer;
}

.register-text:hover {
  text-decoration: underline;
}


</style>

