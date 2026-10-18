import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);

  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    if (!serverUrl) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setUserData(null);
      return;
    }

    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getcurrentuser`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      if (error.response?.status === 401 || error.response?.status === 400) {
        localStorage.removeItem("token");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    serverUrl, 
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
