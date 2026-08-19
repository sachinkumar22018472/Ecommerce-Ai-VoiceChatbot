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
    
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getcurrentuser`,
        {
          withCredentials: true,
        }
      );

      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
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
