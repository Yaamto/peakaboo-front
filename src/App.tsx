import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import Login from './authenticate/login';
import { ChakraProvider, Spinner } from '@chakra-ui/react'
import Register from './authenticate/Register';
import Profile from './pages/Profile';
import { getAuth } from './services/jwtAuth';
import { IUser } from './interfaces/User';
import Navbar from './components/Navbar';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import SinglePost from './pages/SinglePost';
import SingleUser from './pages/SingleUser';
function App() {
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuth, setIsAuth] = useState<Boolean>(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAuth().then((res) => {

      if (res.data) {
        setUser(res.data)

      }
      setLoading(false)
    })
  }, [isAuth])

  if (loading === true) {
    return <Spinner />
  }

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<SingleUser me={user} setMe={setUser} />} />
          <Route path="/post/:id" element={<SinglePost user={user} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
