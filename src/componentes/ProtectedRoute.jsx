import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

export default function ProtectedRoute({children}){


    const {usuario, cargando} = useAuth();

    if(cargando) return <>
    <div className="flex min-h-screen items-center justify-center">
        <p className="flex text-3xl text-zinc-600">cargando... <Loader /></p></div></>
    if(!usuario) return <Navigate to="/"/>
    return children

}