import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { authDataContext } from './AuthContext'
import axios from "axios";

export const adminDataContext = createContext()

function AdminContext({children}) {
    let [adminData, setAdminData] = useState(null)
    let {serverUrl} = useContext(authDataContext)


    const getAdmin = async () => {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        setAdminData(null);
        return;
      }

      try {
        let result = await axios.get(serverUrl + "/api/user/getadmin", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });

        setAdminData(result.data);
        console.log(result.data);
      } catch (error) {
        setAdminData(null);
        if (error.response?.status === 401 || error.response?.status === 400) {
          localStorage.removeItem("adminToken");
        } else {
          console.log(error);
        }
      }
    };


    useEffect(() => {
      getAdmin()
    }, [])

    let value = {
        adminData, setAdminData, getAdmin
    }
  return (
    
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    
  )
}

export default AdminContext