import { create } from "zustand";
import axios from "axios";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean; // ⬅️ Tambahkan ini
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  role: null,
  isAuthenticated: !!localStorage.getItem("token"), // ⬅️ Diambil dari localStorage

  login: async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
  
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  
      const userRes = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });
  
      // set({ token: res.data.token, user: userRes.data });
      set({ token: res.data.token, user: userRes.data,  role: userRes.data.role, isAuthenticated: true }); // ⬅️ Set true
    } catch (error) {
      console.error("Login failed", error);
      throw error; // ⬅️ Tambahkan ini
    }
  },
  

  register: async (name, email, password, password_confirmation) => {
    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation,
      });
  
      // (Opsional) Auto-login setelah register:
      // await get().login(email, password);
  
      // (Opsional) Tambahkan redirect atau notifikasi di luar store.
    } catch (error) {
      console.error("Registration failed", error);
      throw error; // Tambahkan agar error bisa ditangani di komponen
    }
  },
  
  

  logout: () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    // set({ token: null, user: null });
    set({ token: null, user: null, isAuthenticated: false }); // ⬅️ Set false
  },

  fetchUser: async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      set({ user: res.data });
      role: res.data.role // ⬅️ tambah ini
    } catch (error) {
      console.error("Fetch user failed", error);
      throw error;
    }
  },
}));
