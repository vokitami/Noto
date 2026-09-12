import { createContext, useContext, useState } from "react";

//espacio compartido
const ThemeContext = createContext();

export function ThemeProvider ({children}){
    
    const [darkMode, setDarkMode] =  useState(false);

    function toggleDarkMode(){
        setDarkMode(!darkMode) //true
    }

    return(
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    return useContext(ThemeContext)
}