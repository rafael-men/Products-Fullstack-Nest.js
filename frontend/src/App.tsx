import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreateProduct from "./pages/CreateProduct";
import Products from "./pages/Products";
import Home from "./pages/Home";
import EditProductPage from "./pages/EditProduct";
import Category from "./pages/Category";
import Order from "./pages/Order";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import CreateOrder from "./pages/CreateOrder";
import EditOrder from "./pages/EditOrder";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-grow">
          {isSidebarOpen && <Sidebar />}
          <main className="flex-grow p-4">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path='products/new' element={<CreateProduct/>}/>
              <Route path='/edit-product/:id' element={<EditProductPage/>}/>
              <Route path='/categories' element={<Category/>}/>
              <Route path='/categories/new' element={<CreateCategory/>}/>
              <Route path='/edit-category/:id' element={<EditCategory/>}/>
              <Route path='/orders' element={<Order/>}/>
              <Route path='/orders/new' element={<CreateOrder/>}/>
              <Route path="/orders/edit-order/:id" element={<EditOrder/>}/>
            </Routes>
          </main>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;