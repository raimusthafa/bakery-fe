import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ react-router-dom, bukan react-router
import { Avatar, Dropdown, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuthStore } from "../store/auth";
import ConfirmModal from "./modallogout";
import toast from "react-hot-toast";

const LoginLogoutButton = () => {
  const { user, logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // bisa dihapus kalau tidak mau delay
      logout();
      toast.success("Berhasil logout!");
    } catch (error) {
      message.error("Gagal logout. Silakan coba lagi.");
    } finally {
      setIsModalOpen(false);
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      key: "username",
      label: (
        <span className="font-semibold text-[#6F4E37]">
          {user?.name || "User"}
        </span>
      ),
      disabled: true,
    },
    { type: "divider" as const },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: isLoggingOut ? "Logging out..." : "Logout",
      disabled: isLoggingOut,
      onClick: handleLogoutClick,
    },
  ];

  return (
    <div className="text-right">
      {user ? (
        <>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            overlayClassName="!min-w-[12rem]"
          >
            <div className="cursor-pointer flex items-center gap-1">
              <Avatar
                size="large"
                src={undefined}
                icon={<UserOutlined />}
                className="border border-[#D2691E]"
              />
              <ChevronDownIcon className="w-5 h-5 text-[#6F4E37]" />
            </div>
          </Dropdown>

          <ConfirmModal
            open={isModalOpen}
            title="Konfirmasi Logout"
            message="Apakah Anda yakin ingin logout dari akun ini?"
            icon={<LogoutOutlined style={{ fontSize: "24px" }} />}
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleConfirmLogout}
            confirmLoading={isLoggingOut}
          />
        </>
      ) : (
        <Link
          to="/login"
          className="relative px-4 py-1 uppercase text-[#6F4E37] border-2 border-[#6F4E37] overflow-hidden rounded-lg transition-all duration-500 before:absolute before:top-[-100%] before:left-[-100%] before:h-full before:w-full before:bg-[#D2691E] before:transition-all before:duration-500 hover:before:top-0 hover:before:left-0 hover:text-white block text-center"
        >
          <span className="relative z-10 font-normal">Login</span>
        </Link>
      )}
    </div>
  );
};

export default LoginLogoutButton;
