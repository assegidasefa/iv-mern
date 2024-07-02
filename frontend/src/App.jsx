import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AddProductScreen from "./screens/AddProductScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/add-product" element={<AddProductScreen />} />

      </Routes>
    </Router>
  );
};

export default App;
