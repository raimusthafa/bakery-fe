import React from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/auth";

const LoginLogoutButton = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="text-right">
      {user ? (
        // <button
        //   onClick={logout}
        //   className="px-4 py-2 bg-red-600 text-white rounded-md"
        // >
        //   Logout
        // </button>
            <button 
            className="relative px-3 py-1 font-semibold uppercase text-red-500 border-2 border-red-500 overflow-hidden rounded-lg transition-all duration-500 before:absolute before:top-[-100%] before:left-[-100%] before:h-full before:w-full before:bg-red-600 before:transition-all before:duration-500 hover:before:top-0 hover:before:left-0 hover:text-white"
            onClick={logout}
            >
            <span className="relative z-10">Logout</span>
          </button>
      ) : (
<div className="">
  <Link
    to="/login"
    className="relative px-4 py-1 uppercase text-[#6F4E37] border-2 border-[#6F4E37] overflow-hidden rounded-lg transition-all duration-500 before:absolute before:top-[-100%] before:left-[-100%] before:h-full before:w-full before:bg-[#D2691E] before:transition-all before:duration-500 hover:before:top-0 hover:before:left-0 hover:text-white block text-center"
  >
    <span className="relative z-10 font-normal">Login</span>
  </Link>
</div>

      )}
    </div>
  );
};

export default LoginLogoutButton;
