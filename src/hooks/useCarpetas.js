import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export default function useCarpetas(usuario){
    const [listaCarpetas, updateListaCarpetas] = useState([]);
    const [carpetaSeleccionada, updateCarpetaSeleccionada] = useState(null);
    const [cargando, updateCargando] = useState(true);

    useEffect(() => {
        //OBTENER CARPETAS
        async function obtenerCarpetas() {
            const {data, error} = await supabase
                .from("carpetas")
                .select("*")
    
            if(error) alert(error.message)
            else updateListaCarpetas(data)
    
            updateCargando(false)
        }
    
        obtenerCarpetas()
    
        },[])


    //CREAR CARPETA
        async function crearCarpeta(nombre){
    
            if(nombre.trim() === "") return; //valida si el nombre de la carpeta esta vacio
    
            const {error, data} = await supabase
                .from("carpetas")
                .insert({
                    nombre: nombre,
                    usuario_id: usuario.id
                })
                .select()
    
            if(error) alert(error.message)
            else updateListaCarpetas([...listaCarpetas, data[0]])
        }   
    
     //RENAME 
        async function rename(id, nuevoNombre) {
    
            if(nuevoNombre.trim() === "") return false //devuelve false si el nombre esta vacio
    
            const {error, data} = await supabase
                .from("carpetas")
                .update({nombre: nuevoNombre})
                .eq("id", id) 
    
                if(error){
                    alert(error.message)
                    return
                }
                    //actualizar el nombre de la carpeta
                updateListaCarpetas(listaCarpetas.map(c =>
                    c.id === id
                    ? {...c, nombre: nuevoNombre}
                    : c
                ))
    
                if(carpetaSeleccionada?.id === id){
                    updateCarpetaSeleccionada({...carpetaSeleccionada, nombre: nuevoNombre})
                }
                
            return true // devuelve true si la operacion fue exitosa
        }

        //ELIMINAR CARPETA
    async function eliminarCarpeta(id) {
        const {error} = await supabase
            .from("carpetas")
            .delete()
            .eq("id", id)

            if(error) alert(error.message)
            else {
                updateListaCarpetas(listaCarpetas.filter((c) => c.id !== id))
                alert("Se ha eliminado con éxito")
            }
    }
    

    return{
        listaCarpetas,
        carpetaSeleccionada,
        updateCarpetaSeleccionada,
        crearCarpeta,
        eliminarCarpeta,
        rename,
        cargando
    }

    }