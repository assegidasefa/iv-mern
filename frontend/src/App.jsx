import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AddProductScreen from "./screens/AddProductScreen";
import Navbar from "./components/Navbar";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/login" element={<LoginScreen />} exact />
        <Route path="/add-product" element={<AddProductScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
