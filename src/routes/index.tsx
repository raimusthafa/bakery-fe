// Import FC from React
import { FC } from "react";

// Import React Router
import { Routes, Route } from "react-router";

import ProductIndex from "../views/products";
import Home from "../views/home";
import ProductCreate from "../views/products/create";
import ProductEdit from "../views/products/edit";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Allproduct from "../views/allproduct";

// Import view HomePage

// Definisikan component dengan Type FC (Functional Component)
const RoutesIndex: FC = () => {
    return (
        <Routes>
            {/* Route untuk halaman utama */}
            <Route path="/" element={<Home />} />
            {/* Route untuk halaman products */}
            <Route path="/products/admin" element={<ProductIndex />} />
            <Route path="/products" element={<Allproduct />} />
            {/* Route untuk halaman create product */}
            <Route path="/products/create" element={<ProductCreate />} />
            {/* Route untuk halaman edit product */}
            <Route path="/products/edit/:id" element={<ProductEdit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default RoutesIndex;