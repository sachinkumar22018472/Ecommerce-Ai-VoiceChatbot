import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";

import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './components/Nav';


function App() {

  
  return (
    <>
     < Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Registration />} />
      <Route path='/login' element={<Login />}  />
    </Routes>
    </>
  )
}

export default App