import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AddProductScreen from "./screens/AddProductScreen";
import Navbar from "./components/Navbar";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import AddSupplierScreen from "./screens/AddSupplierScreen";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/products/add-product" element={<AddProductScreen />} exact />
        <Route path="/products/categories-list" element={<CategoryListScreen />} exact />
        <Route path="/suppliers/add-suppliers" element={<AddSupplierScreen />} exact />
        <Route path="/login" element={<LoginScreen />} exact />
        <Route path="/signup" element={<SignUpScreen />} exact />
        {/* <Route path="/add-product" element={<AddProductScreen />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
