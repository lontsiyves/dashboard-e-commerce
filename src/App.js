import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import MainLayout from "./components/layouts/MainLayout";
import ProductDetail from './Pages/ProductDetail';
import ProductEditPage from "./Pages/ProductEditPage";


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<ProductEditPage />} />
        
      </Routes>
    </MainLayout>
  );
}

export default App;
