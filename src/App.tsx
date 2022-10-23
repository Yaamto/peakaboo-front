import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

import Home from './pages/Home';
import Login from './authenticate/login';
import { ChakraProvider } from '@chakra-ui/react'
function App() {


  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
