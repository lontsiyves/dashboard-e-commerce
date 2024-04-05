import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import ProductListPage from "./Pages/ProductListPage";
import MainLayout from "./components/layouts/MainLayout";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProductEditPage from "./Pages/ProductEditPage";
import AddProductPage from "./Pages/AddProductPage";
import LoginPage from "./Pages/LoginPage";
import { Provider } from "react-redux";
import Store from "./Store/Store";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./Pages/NotFound"

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="dashboard" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<ProductListPage />} />
            <Route path="product/add" element={<AddProductPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="product/edit/:id" element={<ProductEditPage />} />
            <Route element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
