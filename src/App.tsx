import './App.css';
import { useState } from 'react';
import Home from "./pages/Home"
import Register from "./pages/authenticate/Register"
import Login from "./pages/authenticate/Login"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        {/* <Route path="/orders"
          element={
            <ProtectedRoutes>
              <MyOrders />
            </ProtectedRoutes>
          }
        /> */}
        {/* <Route path="/orders" element={<MyOrders />}>
      </Route> */}
        {/* <Route path="/admin/products"
          element={
            <AdminProtectedRoutes>
              <Products />
            </AdminProtectedRoutes>
          }
        /> */}
        {/* <Route path="/admin/orders"
          element={
            <AdminProtectedRoutes>
              <Orders />
            </AdminProtectedRoutes>
          }
        /> */}

        {/* <Route path="/admin/products" element={<Products />}>
      </Route> */}
        {/* <Route path="/admin/orders" element={<Orders />}>
      </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
