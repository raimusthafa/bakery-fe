import { Outlet } from "react-router";
import NavbarAdmin from "../component/navbaradmin";

const AdminLayout = () => (
  <>
    <NavbarAdmin />
      <div className="pt-14">
        <Outlet />
      </div>
  </>
);

export default AdminLayout;