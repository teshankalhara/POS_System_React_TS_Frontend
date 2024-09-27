import { createContext, useContext, useEffect, useState } from "react";
import AuthContextType from "../types/AuthContextType";
import AuthProviderPropsType from "../types/AuthProviderPropsType";

export const AuthContext=createContext<AuthContextType>({
    isAuthenticated:false,
    jwtToken:null,
    loading:true,
    login:()=>{},
    logout:()=>{}
})

export function AuthProvider({children}:AuthProviderPropsType){
    const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false)
    const [jwtToken,setJwtToken]=useState<string|null>(null)
    const [loading,setLoading]=useState<boolean>(true)
    
    function login(jwtToken:string){
        setIsAuthenticated(true)
        setJwtToken(jwtToken)
        localStorage.setItem("token",jwtToken)
    }

    function logout(){
        setIsAuthenticated(false)
        setJwtToken(null)
        localStorage.removeItem("token")
    }

    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(token!=null){
            setIsAuthenticated(true)
            setJwtToken(jwtToken)
            setLoading(false)
        }else{

        }
    },[])

    return(
        <AuthContext.Provider value={{isAuthenticated,jwtToken,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)