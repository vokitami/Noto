import { Link } from "react-router-dom";
import { useState, useEffect, useImperativeHandle } from "react";
import { LogOut, Plus, PenLine, Trash2, Folder,Ellipsis } from "lucide-react";
import { supabase } from "../supabase/client";
import { useAuth } from "../context/authContext";
import { fa } from "@faker-js/faker";
import { useTranslation } from "react-i18next";

export default function SideBar({
    nombre,
    listaCarpetas,
    carpetaSeleccionada,
    updateCarpetaSeleccionada,
    crearCarpeta,
    eliminarCarpeta,
    rename,
    sidebarAbierto,
    updateSidebarAbierto
}){ 
    
    const {cerrarSesion} = useAuth();
    const {t, i18n} = useTranslation();

    //estados
    const [mostrandoInput, updateMostrandoInput] = useState(false);
    const [nombreCarpeta, updateNombreCarpeta] = useState("");
    const [openMenuId, updateOpenMenuId] = useState(null);
    const [editarCarpeta, updateEditarCarpeta] = useState(null);
    const [nuevoNombre, updateNuevoNombre] = useState("");



//manejo de estado dentro o fuera del menu
    useEffect(() => {

            function handleClickFuera(){
                updateOpenMenuId(null)
                updateEditarCarpeta(null)
                updateSidebarAbierto(false)
            }

            document.addEventListener("mousedown", handleClickFuera)
            return () => document.removeEventListener('mousedown', handleClickFuera)


        },[])


    return(
            <div 
            className={`flex flex-col min-h-screen border-r border-zinc-500 bg-zinc-800/98 text-zinc-300/80 shrink-0 
            fixed inset-y-0 left-0 z-40 w-55 transition-transform duration-300 md:relative md:translate-x-0
            ${sidebarAbierto ? "translate-x-0" : "-translate-x-full bg-transparent/50"}`}
            onMouseDown={(e) => e.stopPropagation()}>
                <div className="p-4 ">
                    <p className="text-[16px] font-medium">{nombre}'s space</p>
                    <Link to={"/"} className="text-[15px] mt-0.5">Noto</Link>
                </div>

                <div className="border-t -my-1"/>

                {/*carpeta del usuario */}
                <div className="p-2">
                    <p className="text-[14px] py-2 tracking-wide -mb-1">{t("carpetas")}</p>
                
                    <div
                     className="flex flex-col gap-2">

                        {/*boton para agregar mas carpetas */}                        
                        <div className="flex flex-col overflow-hidden">
                            <button 
                            onClick={() => updateMostrandoInput(!mostrandoInput)}
                            className="flex items-center rounded gap-1 px-2 py-1 mb-1 hover:bg-zinc-400/50 cursor-pointer active:scale-95 transition-transform duration-300">
                                <Plus size={15} />
                                <span>{t("nueva_carpeta")}</span>
                            </button>

                            <div>
                                {mostrandoInput
                                && <input
                                autoFocus
                                placeholder="nombre de la carpeta..."
                                className="rounded px-2 py-1 outline-none"
                                value={nombreCarpeta} onChange={(e) => updateNombreCarpeta(e.target.value)}
                                onKeyDown={(e) =>{ if (e.key === "Enter") {
                                    crearCarpeta(nombreCarpeta)
                                    updateNombreCarpeta("")
                                    updateMostrandoInput(false)
                                }}
                                    
                                }
                                
                                ></input>
                                }
                            </div>
                            
                        </div>


                        {/*carpetas del usuario dinamicas*/}
                        <div
                        className="flex flex-col gap-1">
                            {listaCarpetas.map(carpeta => (
                                <div key={carpeta.id}
                                onClick={() => updateCarpetaSeleccionada(carpeta)}
                                className={`group realtive flex px-2 p-1 hover:bg-zinc-600/50 rounded cursor-pointer 
                                ${carpetaSeleccionada?.id === carpeta.id ? "bg-zinc-600/50" : "bg-transparent"}`}>

                                    {editarCarpeta?.id === carpeta.id
                                    ?(
                                        <div className="border rounded w-full">
                                            <input placeholder="Nuevo nombre carpeta..." autoFocus
                                            value={nuevoNombre}
                                            onChange={(e) => updateNuevoNombre(e.target.value)}
                                            onKeyDown={async (e) => {if  (e.key === "Enter"){ //funcion asincrona para esperar un resultado 

                                                const resultado = await rename(editarCarpeta.id, nuevoNombre);

                                                if(resultado){
                                                    updateEditarCarpeta(null);
                                                    updateNuevoNombre("");
                                                }
                                                
                                            }}}
                                            onMouseDown={(e) => e.stopPropagation()}
                                            className="px-2 py-1 justify-center"></input>
                                        </div>
                                    )
                                    :(
                                        <div className="flex items-center gap-1">  
                                            
                                    <Folder size={15}/>
                                    <p className="flex-1">{carpeta.nombre}</p>
                                        </div>
                                    )}


                                  {/*Boton de menu */}
                                    <div className="realtive ml-auto items-center justify-end">
                                        <button
                                                title="abrir"
                                                className="
                                                p-1
                                                rounded
                                                opacity-0
                                                group-hover:opacity-100
                                                transition-opacity
                                                hover:cursor-pointer
                                                hover:bg-zinc-400"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateOpenMenuId(openMenuId === carpeta.id 
                                                        ? null
                                                        : carpeta.id
                                                    )}}>
                                            <Ellipsis size={15}/>
                                        </button>
                                        {/*Menu flotante */}
                                        {openMenuId === carpeta.id && (
                                                <div
                                                onMouseDown={(e) => e.stopPropagation()}
                                                className="absolute flex flex-col p-2 rounded gap-1
                                                border shadow-lg z-10 bg-zinc-800 "    >
                                                    {/*boton para eliminar una carpeta */}
                                                    <button 
                                                    onClick={() => eliminarCarpeta(carpeta.id)}
                                                    className="flex p-1 rounded items-center justify-center gap-1 hover:text-red-500 hover:cursor-pointer hover:bg-zinc-700"><Trash2 size={15}/>Eliminar</button>
                                                    
                                                    {/*boton para rename una carpeta */}
                                                    <button
                                                    onClick={() => {
                                                        updateEditarCarpeta(carpeta)
                                                        updateNuevoNombre(carpeta.nombre)
                                                        updateOpenMenuId(null)
                                                    }}
                                                    className="flex p-1 rounded items-center justify-center gap-1 hover:cursor-pointer hover:bg-zinc-700"><PenLine size={15}/>Rename</button>
                                                    
                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))}

                        </div>

                        
                        
                    </div>

                </div>
                
                <div className="flex mt-auto mb-6 px-4">
                    <button
                    //funcion para serrar cesion
                    onClick={cerrarSesion}
                    className="flex items-center gap-1 border cursor-pointer rounded w-full pl-2 py-1 active:bg-zinc-400/50 active:scale-92 transition-transform duration-600">
                        <LogOut size={15}/>
                        <span>{t("cerrar_sesion")}</span>
                    </button>
                </div>

            </div>
    )



}