import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import AuthContext from './context/authContext.jsx'
import UserContext from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
  <UserContext>

    <App />
  </UserContext>
  </AuthContext>
  </BrowserRouter>
)