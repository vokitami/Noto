import { useState, useEffect, useRef} from "react";

export default function useDebounce(funcionRef, delay, deps){

    //la caja donde guardamos el valor
    const timerRef = useRef(null);
    
    useEffect(() => {

        //cancela el timer anterior si existe
        clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            funcionRef() //ejecuta la funcion despues del dalay
        }, delay)

        //clean up  cancela el timer si el componente se desmonta
        return () => clearTimeout(timerRef.current)
         
    }, deps) //se ejecuta cuando las dependencias cambian titulo, o contenido
    
}