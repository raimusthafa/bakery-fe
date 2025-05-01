import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import NavbarAdmin from "../component/navbaradmin";
const PrivateRoute: React.FC = () => {
  const { isAuthenticated, role } = useAuthStore(); // Ambil status login & role

  console.log("islogin", isAuthenticated);
  console.log("role:", role);

  // Jika belum login atau bukan admin, redirect ke halaman utama
  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <NavbarAdmin />
      <div className="pt-14">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRoute;
