import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(JSON.parse(localStorage.getItem("user")) || null);

  
  return (
    <AuthContext.Provider value={{state,setState }}>
      { children }
    </AuthContext.Provider>
  )

}