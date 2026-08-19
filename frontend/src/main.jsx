import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import AuthContext from "./context/AuthContext.jsx";
import UserContext from './context/UserContext.jsx'
import ShopContext from './context/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
  <UserContext>
    <ShopContext>

    <App />


    </ShopContext>
  </UserContext>
  </AuthContext>
  </BrowserRouter>
)
