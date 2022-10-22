import './App.css';
import { useState, useEffect } from 'react';
import Home from "./pages/Home"
import Register from "./pages/authenticate/Register"
import Login from "./pages/authenticate/Login"
import UserContextProvider from './components/context/UserContext';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { IUser } from './interfaces/User';
import { getAuth } from './components/utils/isAuth';
import Navbar from './components/Navbar';
function App() {

  const [userInfo, setUserInfo] = useState<IUser | null>()


  const randomNumber = () => {
    const test = Math.floor(Math.random() * 6 + 1)
    return test
  }
  useEffect(() => {
    getAuth().then((res) => setUserInfo(res.data))
    let number = randomNumber()
    localStorage.setItem("avatarNumber", JSON.stringify(number))
  }, [])

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home {...userInfo} />}>
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
