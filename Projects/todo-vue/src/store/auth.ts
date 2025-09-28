// src/stores/auth.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const username = ref("");

  function login(user: string, password: string) {
    // Simple hardcoded authentication
    if (user === "admin" && password === "password") {
      isLoggedIn.value = true;
      username.value = user;
      return true;
    }
    return false;
  }

  function logout() {
    isLoggedIn.value = false;
    username.value = "";
  }

  return { isLoggedIn, username, login, logout };
});
