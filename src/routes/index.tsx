import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import ProductIndex from "../views/products";
import Home from "../views/home";
import ProductCreate from "../views/products/create";
import ProductEdit from "../views/products/edit";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Allproduct from "../views/allproduct";
import UserLayout from "../layout/userlayout";
import AdminLayout from "../layout/adminlayout";
import PrivateRoute from "./privatroute";
import Dumpbutton from "../dump/dump_button";
import Navbar from "../component/navbar";
import ProductDetail from "../views/detailproduct";

const RoutesIndex: FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Allproduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route index element={<Dumpbutton />} />
        <Route path="products" element={<ProductIndex />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="products/edit/:id" element={<ProductEdit />} />
      </Route>
    </Routes>
  );
};

export default RoutesIndex;
