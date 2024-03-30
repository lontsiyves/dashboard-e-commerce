import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import MainLayout from "./components/layouts/MainLayout";
import ProductDetail from './Pages/ProductDetail'


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        
      </Routes>
    </MainLayout>
  );
}

export default App;
