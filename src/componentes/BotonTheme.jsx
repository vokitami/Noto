import { useTheme } from "../context/themeContext";
import { Sun, Moon } from "lucide-react";

export default function BotonTheme(){

    const {darkMode, toggleDarkMode} = useTheme();

    return(<>
    
    <div className="flex items-center hover:cursor-pointer">
        <button onClick={toggleDarkMode} className={`cursor-pointer border p-2 rounded-full transition duration-400 ${darkMode ? 'hover:bg-zinc-900': 'hover:bg-gray-100'}`}>{darkMode? <Sun size={25}/> : <Moon size={25}/>}</button>
    </div>
    
    
    </>)
}