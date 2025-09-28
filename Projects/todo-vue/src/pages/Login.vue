<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <button @click="showSignup = true">Sign up</button>
    </p>

    <Signup v-if="showSignup" @close="showSignup = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import Signup from "./Signup.vue";

const { login } = useAuth();
const username = ref("");
const password = ref("");
const showSignup = ref(false);

const handleLogin = () => {
  if (login(username.value, password.value)) {
    alert("Login successful!");
    // redirect to home
    window.location.href = "/";
  } else {
    alert("Invalid credentials");
  }
};
</script>
