import { supabase } from "../supabase/client"
import { useEffect, useState } from "react";

//obtener nota seleccionada
export default function useSingleNota(id){

    const [nota, updateNota] = useState(null);

   useEffect(() => {

    async function obtenerNota(){
        //buscar la nota con el id en supabase
        const {data, error} = await supabase
            .from('notas')
            .select('*')
            .eq("id", id)
            .single() //regresa un objeto, no un array

            if(error){
                alert(error.message)
                return
            }else updateNota(data)
    }

    //si hay un id ejecutar funcion
        if(id){
            obtenerNota();
        }

   }, [id]) //se ejecuta cada vez que cambie id de una nota

   return {nota};

}