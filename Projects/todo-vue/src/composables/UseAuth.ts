import { ref } from "vue";

const user = ref<string | null>(null);

export function useAuth() {
  const login = (username: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const validUser = storedUsers.find(
      (u: any) => u.username === username && u.password === password
    );
    if (validUser) {
      user.value = username;
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (storedUsers.find((u: any) => u.username === username)) {
      throw new Error("Username already exists");
    }
    storedUsers.push({ username, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));
    user.value = username;
  };

  const logout = () => {
    user.value = null;
  };

  return { user, login, signup, logout };
}
