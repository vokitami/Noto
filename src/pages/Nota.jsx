import { useAuth } from "../context/authContext"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MoveLeft, ArrowLeft, ArrowUp } from "lucide-react";
import { supabase } from "../supabase/client";
import useSingleNota from "../hooks/useSingleNota";
import useEditarNota from "../hooks/useEditarNota";
import { useTheme } from "../context/themeContext";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export default function NotaPage(){

    const {usuario} = useAuth();
    const nombre = usuario?.user_metadata?.nombre;

    const { id } = useParams();
    const { nota } = useSingleNota(id);

    const {titulo, updateTitulo, contenido, updateContenido, guardado} = useEditarNota(nota);

    const navigate = useNavigate();
    const location = useLocation();
    const nombreCarpeta = location.state?.nombreCarpeta ?? "Dahsboard"; //para leer de que carpeta viene la nota

    const {darkMode} = useTheme();

    return(
        <>
        {nota ? (
            <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className="flex border p-3 mt-5 justify-between px-4">
                    <span
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-600 hover:cursor-pointer">
                        <ArrowLeft size={18}/>{t("volver_a")} {nombreCarpeta} 
                    </span>
                    <p className={`px-15 ${darkMode ? "text-zinc-300/80" : "text-black"}`}>
                        {guardado === "Guardando" && t("guardando")}
                        {guardado === "Error" && t("error_al_guardar")}
                        {guardado === "Guardado" && t("guardado_automaticamente")}
                        </p>   
                </div>

                <main className="flex flex-col flex-1">
                    <input 
                    className="text-[30px] mt-3 px-6 py-3 w-1/2 outline-none cursor-pointer"
                    value={titulo}
                    onChange={(e) => updateTitulo(e.target.value)}
                    placeholder={t("mi_nota")}
                    />
                    <div className="border-t -my-1"/>
                    <textarea
                    value={contenido}
                    onChange={(e) => updateContenido(e.target.value)} 
                    className="flex-1 w-full outline-none px-10 pt-8 cursor-pointer"/>
                </main>
            </div>
        ) : (
            <div className="flex min-h-screen justify-center items-center">
                <p className="text-3xl text-zinc-600">Cargando...</p>
            </div>
            
        )}
    </>
    )}