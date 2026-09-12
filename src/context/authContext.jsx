// para que toda la aplicacion sepa su hay un usuario autentificado
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";


//crear el espacio compartido
const AuthContext = createContext();

//el componente que envuelve toda la app
export function AuthProvider({children}){

    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        //verifica si hay sesion guardada 
        supabase.auth.getSession().then(({data: {session} }) => { //then(objeto que recibimos)
           setUsuario(session?.user ?? null)
           setCargando(false)
        })

        //Escuchar cambios de sesion
        const {data: {subscription} } = supabase.auth.onAuthStateChange(
            (_event, session) => { //_event, ignoramos este parametro aproposito
                setUsuario(session?.user ?? null)
            }
        )
        
        return () => subscription.unsubscribe()
        
    }, [])

    /*funcion para cerrar sesion */
    async function cerrarSesion() {
        const {error} = await supabase.auth.signOut({scope: 'local'});
        
        if(error) alert(error.message)
        else {
            alert("Se ha cerrado la sesión con éxito")
        }}
    
    return(
        <AuthContext.Provider value={{usuario, cargando, cerrarSesion}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth(){
    return useContext(AuthContext)
}