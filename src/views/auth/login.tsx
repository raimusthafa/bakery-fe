import { useState } from "react";
import { useAuthStore } from "../../store/auth";
import { useNavigate } from "react-router-dom"; // ✅ ini harus react-router-dom, bukan react-router
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);

      // Ambil user terbaru dari Zustand setelah login berhasil
      const currentUser = useAuthStore.getState().user;
      
      // toast.success(`Selamat Datang, ${currentUser?.name || "User"}`, {
      //   duration: 3000,
      // });

      toast(`Hello, ${currentUser?.name || "User"}!`,
        {
          icon: '👋',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );

      // 🚀 Pindahkan berdasarkan role
      if (currentUser?.role === "admin") {
        navigate("/dashboard"); 
      } else {
        navigate("/");
      }
      
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login gagal. Periksa email atau password.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF6ED]">
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-md border border-[#B88C65]">
        <h2 className="text-3xl font-bold text-[#6F4E37] mb-6 text-center">Masuk ke Akunmu</h2>

        <label className="block mb-2 text-[#6F4E37] font-semibold">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-[#B88C65] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
        />

        <label className="block mb-2 text-[#6F4E37] font-semibold">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#B88C65] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-[#8B7E74]"
          >
            {showPassword ? "Sembunyikan" : "Lihat"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#D9822B] hover:bg-[#B88C65] text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
