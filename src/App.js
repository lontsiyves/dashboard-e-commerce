import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import ProductListPage from "./Pages/ProductListPage";
import MainLayout from "./components/layouts/MainLayout";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProductEditPage from "./Pages/ProductEditPage";
import AddProductPage from "./Pages/AddProductPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/:id/edit" element={<ProductEditPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
