import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextInstance";
import socket from "../Socket/socket";






export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const id = localStorage.getItem("id");
        return token ? {token,role,id} : null
});

useEffect(()=>
{
    console.log("AuthProvider useEffect - user changed:", user?.id);
    console.log("Socket current state:", socket.connected);
    console.log("Hello user",user?.id);
    if(user?.id)
    {
        console.log("Connecting socket for user:", user?.id);
        socket.connect();
        // socket.emit("join",user?.id);
        socket.on("connect", () => {
            console.log("Socket Connected! ID:", socket.id);
            socket.emit("join", user.id); // JOIN HERE
        });

        // If already connected, just join
        // if (socket.connected) {
        //     socket.emit("join", user.id);
        // }
    }
    return ()=>
    {
        socket.off("connect");
        socket.disconnect();
    };
},[user?.id]);

     const isAuthenticated = !!user?.token;

    const login = (userData)=>
    {
        localStorage.setItem("token",userData.token)
        localStorage.setItem("role",userData.role)
        localStorage.setItem("id",userData.id)
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

