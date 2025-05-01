import { Outlet } from "react-router";
import Navbar from "../component/navbar";

const UserLayout = () => (
  <>
    <Navbar />
    <div className="pt-14">
        <Outlet />
      </div>
  </>
);

export default UserLayout;