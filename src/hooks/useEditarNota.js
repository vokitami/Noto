import useDebounce from "./useDebounce";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function useEditarNota(nota){
    const [titulo, updateTitulo] = useState('');
    const [contenido, updateContenido] = useState('');
    const [guardado, updateGuardado] = useState("Guardado");

    //verificamos si ya se obtuvieron los datos 
    useEffect(() => {

        if(nota){
            updateTitulo(nota.titulo)
            updateContenido(nota.contenido)
        }
    }, [nota])

    //funcion para guardar titulo, contenido
    async function guardar(){
        if(!nota) return //si no hay nota no hacer nada

        updateGuardado("Guardando") //antes de guardar actualiza a guardando

        const {error} = await supabase 
            .from("notas")
            .update({titulo, contenido})
            .eq("id", nota.id)


        if(error) {
            updateGuardado("Error")
            alert(error.message)
        }else {
            updateGuardado("Guardando") //sigue mostrando guardado
            setTimeout(() => {
                updateGuardado("Guardado") // cambia aguardado despues de 1s para más dinamico
            },1000)
        } 
    }

    useDebounce(guardar, 1500, [titulo, contenido])

    return {titulo, updateTitulo, contenido, updateContenido, guardado}
}