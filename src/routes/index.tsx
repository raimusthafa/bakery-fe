import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../views/home";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Allproduct from "../views/allproduct";
import UserLayout from "../layout/userlayout";
import PrivateRoute from "./privatroute";
import ProductDetail from "../views/detailproduct";
import ProductIndex from "../views/admin/products";
import ProductCreate from "../views/admin/products/create";
import ProductEdit from "../views/admin/products/edit";
import CategoryIndex from "../views/admin/categori";
import CategoryCreate from "../views/admin/categori/create";
import CategoryEdit from "../views/admin/categori/edit";
import CategoryPage from "../views/cobaa/CategoryPage";
import ParallaxHero from "../component/home/parallax";
import Dashboard from "../views/admin/dashboard/dashboard";

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
        <Route path="/parallax" element={<ParallaxHero />} />
      </Route>

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductIndex />} />
        <Route path="categories" element={<CategoryIndex />} />
        <Route path="categories2" element={<CategoryPage />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="products/edit/:id" element={<ProductEdit />} />
        <Route path="categories/create" element={<CategoryCreate />} />
        <Route path="categories/edit/:id" element={<CategoryEdit />} />
      </Route>
    </Routes>
  );
};

export default RoutesIndex;
