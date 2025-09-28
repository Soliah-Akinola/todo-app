<template>
  <div class="signup-modal">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
      <button type="button" @click="$emit('close')">Cancel</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";

const { signup } = useAuth();
const username = ref("");
const password = ref("");

const handleSignup = () => {
  try {
    signup(username.value, password.value);
    alert("Account created! You are now logged in.");
    window.location.href = "/";
  } catch (err: any) {
    alert(err.message);
  }
};
</script>
