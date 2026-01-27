import { useState } from "react";
import { AuthContext } from "./AuthContextInstance";





export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        return token ? {token,role} : null
});

     const isAuthenticated = !!user?.token;

    const login = (userData)=>
    {
        localStorage.setItem("token",userData.token)
        localStorage.setItem("role",userData.role)
        setUser(userData);
    }

    const logout = ()=>
    {
        localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{login,user,logout,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
        
    )
}

