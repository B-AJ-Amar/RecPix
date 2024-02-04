import React, { useState, useContext, createContext } from "react";

import axios from "axios";
// import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UserType{
    username: string
    email: string
    img: string | null
    id: number
    isSuperuser: boolean
}

interface LoginResType{
    user: UserType
    accessToken: string
}

interface AuthContextProps {
    user: UserType | null
    isAuthenticated: boolean
    login: (username: string, password: string) => void
    logout: () => void
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [user, setUser] = useState<UserType | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
      });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        return storedAuth ? JSON.parse(storedAuth) : false;
    });
    const [accessToken, setAccessToken] = useState<String| null>(() => {
        const storedAccessToken = localStorage.getItem("access-token");
        return storedAccessToken ? storedAccessToken : null;
      });

    const login = (username: string, password: string) => {
        const data = axios.post('http://localhost:3000/api/authToken/login', {
            "username":username,
            "password":password
        }).then( res => {
            console.log(res,res.status);
            console.log();
            if (res.status === 200) {
                setUser(res.data.user);
                setIsAuthenticated(true);
                setAccessToken(res.data["access-token"]);
                localStorage.setItem("access-token", res.data["access-token"]);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("isAuthenticated", "1");
                // setUser(res);
            //     return true;
            }
        
        }).catch( err => {
            console.log(err);
            return null;
        });
    
    }
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("access-token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
    }


    return (

        <AuthContext.Provider value={ { user , accessToken , isAuthenticated , login , logout } } >
            {children}
      </AuthContext.Provider>
    )
    
}

export function useAuth() {
    return useContext(AuthContext);
}