import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import ProductListPage from "./Pages/ProductListPage";
import MainLayout from "./components/layouts/MainLayout";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProductEditPage from "./Pages/ProductEditPage";
import AddProductPage from "./Pages/AddProductPage";
import LoginPage from "./Pages/LoginPage"
import { Provider } from "react-redux";
import Store from "./Store/Store";

function App() {
  return (
    <Provider store={Store}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} exact />
          <Route path="/dashboad" element={<Home />} exact />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/product/add" element={<AddProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/edit/:id" element={<ProductEditPage />} />
        </Routes>
      </MainLayout>
    </Provider>
  );
}

export default App;
