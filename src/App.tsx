import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import Login from './authenticate/login';
import { ChakraProvider } from '@chakra-ui/react'
import Register from './authenticate/Register';
import Profile from './pages/Profile';
import { getAuth } from './services/jwtAuth';
import { IUser } from './interfaces/User';
import Navbar from './components/Navbar';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
function App() {
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuth, setIsAuth] = useState<Boolean>(false)

  useEffect(() => {
    getAuth().then((res) => {
      console.log(res.data)
      if (res.data) {
        setUser(res.data)
        console.log(user)
      }
    })
  }, [isAuth])

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<ProtectedRoute><Profile user={user} /></ProtectedRoute>} />


        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
