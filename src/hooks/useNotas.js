import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useTranslation } from "react-i18next";

//notas para mostrar en el dashboard
export default function useNotas(usuario, carpetaSeleccionada){

    const [listaNotas, updateListaNotas] = useState([]);

    useEffect(() => {
        
        async function ObtenerNotas (){
            if(!carpetaSeleccionada) return 
            
            const {data, error} = await supabase
                .from("notas")
                .select("*")
                .eq("carpeta_id", carpetaSeleccionada.id)//filtro especifico

            if(error) alert(error.message)
            else updateListaNotas(data)

        }

        ObtenerNotas()

    }, [carpetaSeleccionada?.id])



    async function crearNota(){

        if(!carpetaSeleccionada) return

        const {data, error} = await supabase
            .from("notas")
            .insert({
                titulo:  "",
                contenido: "",
                carpeta_id: carpetaSeleccionada.id,
                usuario_id: usuario.id
            })
            .select()


            if(error) alert(error.message)
            else{
                updateListaNotas([...listaNotas, data[0]])
            }
    }


    async function eliminarNota(id){

        //console.log(id)
        const {error} = await supabase
            .from("notas")
            .delete()
            .eq("id" , id)

        if(error) alert(error.message)
        else{
            alert("Se ha eliminado con éxito")
            updateListaNotas(listaNotas.filter(n => n.id !== id))
        }

    }

    return {
        listaNotas,
        crearNota,
        eliminarNota
    }


}