import { useAuth } from "../context/authContext"
import { Plus, FileText, Trash2, PanelLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SideBar from "../componentes/SideBar";
import useCarpetas from "../hooks/useCarpetas";
import useNotas from "../hooks/useNotas";
import { useState } from "react";
import { useTheme } from "../context/themeContext";
import BotonTheme from "../componentes/BotonTheme";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../componentes/LanguageSwitcher";


export default function Dashboard(){

    //obtenemos el nombre del usuario 
    const { usuario } = useAuth();
    const nombre = usuario?.user_metadata?.nombre

    const {darkMode, toggleDarkMode} = useTheme();
    const {t, i18n} = useTranslation();

    //estado
    const [sidebarAbierto, updateSidebarAbierto] = useState(false);
    

    //custom hook de carpetas
    const {
        listaCarpetas,
        carpetaSeleccionada,
        updateCarpetaSeleccionada,
        crearCarpeta,
        eliminarCarpeta,
        rename
    } = useCarpetas(usuario);


    //custom hook de notas
    const {
        listaNotas,
        crearNota,
        eliminarNota
    } = useNotas(usuario, carpetaSeleccionada);


    const navigate = useNavigate();


    return(
        <div className={`flex overflow-hidden min-h-screen border rounded-xl
        ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-gray-900'}`}>

             {/*Boton del sidebar para movil */}
            <div className="absolute md:hidden pl-5 py-6 items-start gap-3">
                <button 
                title="abrir menu"
                className="hover:cursor-pointer"
                onClick={() => updateSidebarAbierto(!sidebarAbierto)}
                >
                    <PanelLeft size={15}/> 
                </button>
            </div>

            {/*Sidebar */}
            <SideBar
            nombre={nombre}
            listaCarpetas={listaCarpetas}
            carpetaSeleccionada={carpetaSeleccionada}
            updateCarpetaSeleccionada={updateCarpetaSeleccionada}
            crearCarpeta={crearCarpeta}
            eliminarCarpeta={eliminarCarpeta}
            rename={rename}
            sidebarAbierto={sidebarAbierto}
            updateSidebarAbierto={updateSidebarAbierto}
            
            />


            {/*contenido - notas*/}
            <div className="flex flex-col w-full p-10">
            <div className="flex justify-between px-4 md:px-15 mb-5 items-center">
                <div>
                    <h1 className="text-3xl mb-3">{carpetaSeleccionada?.nombre ?? t("selecciona_una_carpeta")}</h1>
                    <span className="text-lg">{`${listaNotas.length} ${listaNotas.length === 1 ? t("nota") : t("notas")}`}
                    </span> 
                </div>

                <div className="flex gap-5 p-2 items-center">
                    <BotonTheme/>
                    <LanguageSwitcher/>
                </div>
            
            </div>
            
            
            <hr/>

            <div className="flex justify-between px-2 md:px-15 py-5 items-center">
                <span>{t("todas_las_notas")}</span>
                <button
                onClick={crearNota}
                className="flex rounded border px-2 py-1 items-center gap-1 active:bg-zinc-400/50 active:scale-92 transition-tranform duration-600 cursor-pointer">
                    <Plus size={15}/>
                    <span>{t("nueva_nota")}</span>
                </button>
            </div>

            <hr/>

            {/*note card */}
            {/*No hay carpeta seleccionada, no mostrar nada */}
            {!carpetaSeleccionada 
            
            ? (<div className="flex flex-1 justify-center pt-35 ">
                    <p className="text-2xl text-gray-500 font-mono">{t("selecciona_una_carpeta_para_mostrar_notas")}</p>   
                </div>)

            : listaNotas.length === 0 ? (
                //si no hay notas 
                <div className="flex flex-1 justify-center pt-35 ">
                    <p className="text-2xl font-mono text-gray-500">{t("esta_carpeta_esta_vacia")}</p>   
                </div>
            )
            
            : (
                //hay notas -  mostrarlas con map()
                <div className="flex flex-col mt-10 gap-5">
                    {listaNotas.map(nota => (
                        <div 
                        key={nota.id}
                        onClick={() => navigate(`/nota/${nota.id}`, { //navegamos a notas
                            state: { nombreCarpeta: carpetaSeleccionada.nombre} //venimos del nombre de la carpeta que se seleccionó para leerlo con useLocation()
                            })}
                        className={`group flex border rounded cursor-pointer justify-between px-8 ${darkMode ? "hover:bg-zinc-700/50" : "hover:bg-zinc-200" }  transition duration-200`}>
                <div className="flex flex-col pt-2 pb-1">
                    
                    <div className="flex items-center gap-2">
                         <FileText size={20}/>
                    <span className="text-lg">{nota.titulo || t("mi_nota")}</span>
                    </div>

                   <div className="mb-2">
                    {new Date(nota.creado_en).toLocaleDateString(i18n.language === "es" ? "es-MX" : "en-US", 
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}
                   </div>
                </div>
                
                <div className="flex gap-3 items-center 
                    opacity-0
                    translate-x-2 
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    transition-all
                    duration-200">
                    <Trash2 
                    onClick={(e) => {
                        e.stopPropagation()
                        eliminarNota(nota.id)}}
                    title="Eliminar"
                    size={32} 
                    className="border p-1 rounded text-red-500 active:bg-zinc-300 active:scale-90 transition-transform duration-600"/>
                </div>
            </div>
                    ))}

                </div>

                )}

            </div>
            
       
        
        </div>
    )
}