import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ItemPage from "./pages/ItemPage";
import Cart from "./pages/Cart";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryPage/>} />
          <Route path="/item" element={<ItemPage/>} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
