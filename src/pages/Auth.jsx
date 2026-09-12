import { useTheme } from "../context/themeContext"
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../componentes/LanguageSwitcher";

export default function Auth(){

    const navigate = useNavigate();
    
    const {darkMode, toggleDarkMode} = useTheme();
    const {t, i18n} = useTranslation();

    const [estaRegistrado, setEstaRegistrado] = useState(false);
    const [userName, setUserName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault(); 
        //registro false
        if(estaRegistrado) {
            //validacion de contraseñas
            if(password !== confirmPassword){
                alert("Las contraseñas no coindicen, vuelve a intentarlo!");
                return
            }

            const {error} = await supabase.auth.signUp({
                //guardamos email,password y username
                email,
                password,
                options:{
                    data:{
                        nombre:userName 
                    }
                }
            })
            if(error) alert(error.message)
            else {
                alert("Se ha resgistrado con éxito!")
                navigate("/dashboard")
            }

        }else{
            //login true
            const {error} = await supabase.auth.signInWithPassword({email, password})
            if(error) alert(error.message)
            else{
                alert("Has iniciado sesión con éxito!")
                navigate("/dashboard")
        }
            
        }
    }

    return(
        <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-gray-900'}`}>
            <nav className="flex justify-between px-5 py-6 md:px-8">
            <span className="text-2xl tracking-wide">No<span className="text-zinc-500">to</span></span>
            
             <div className="flex gap-15 items-center">
                <button className={`flex mr-2 py-1 px-4 border rounded-xl justufy-center items-center hover:cursor-pointer ${darkMode ? 'hover:bg-zinc-800': 'hover:bg-gray-200'}`}
                onClick={() => setEstaRegistrado(!estaRegistrado)}>{estaRegistrado ? t("iniciar_sesion") : t("registrarse")}</button>
                <button onClick={toggleDarkMode} className={`cursor-pointer border p-2 rounded-full transition duration-400 ${darkMode ? 'hover:bg-zinc-800': 'hover:bg-gray-200'}`}>{darkMode? <Sun size={25}/> : <Moon size={25}/>}</button>
                <LanguageSwitcher/>
               </div>
               
            </nav>

            <div className="flex flex-col md:flex-row md:flex-1">
                {/*left */}
                <div className="flex flex-col flex-1 md:flex-1 md:pr-80 py-16 px-6 md:py-30 md:px-16 border-y">
                    <p className="text-lg tracking-wide capitalize mb-4">NOTO</p>
                    <h1 className="text-[26px] tracking-wide font-medium leading-8 mb-3">{t("tu_espacio")}<br/><span className="text-zinc-500">{t("pensar_y_crear")}</span></h1>
                    <p className="text-lg md:text-[20px] leading-[1.6]">{t("organiza")}<br/>{t("en_un_solo_lugar")}</p>
                    <div className="mt-6 flex flex-col gap-2.5">
                        <div className="flex items-center gap-2.5 text-[18px]"><div className="w-2 h-2 rounded-full shrink-0 border"></div>{t("carpetas_y_notas_organizadas")}</div>
                        <div className="flex items-center gap-2.5 text-[18px]"><div className="w-2 h-2 rounded-full shrink-0 border"></div>{t("acceso_desde_cualquier_lugar")}</div>
                        <div className="flex items-center gap-2.5 text-[18px]"><div className="w-2 h-2 rounded-full shrink-0 border"></div>{t("Datos_seguros_con_Supabase")}</div>
                    </div>
                </div>

                

                {/*rigth */}
                <div className="flex flex-1 items-start justify-center md:px-25 md:border">
                    
                    <form onSubmit={handleSubmit}>

                    {!estaRegistrado ? (
                        <>
                        {/*login view */}
                        <div className="my-15 shadow-xl py-10 px-15 rounded-2xl">
                            <p className="text-[24px] tracking-tighter">{t("iniciar_sesion")}</p>
                            <p className="text-[18px] mb-5">{t("bienvenido_de_nuevo")}</p>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-[17px] mb-1  tracking-tight">EMAIL</label>
                            <input required value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder={t("nombre_ejemplo")} 
                            className="w-full px-2 py-2 border rounded-md text-[15px] outline-none focus:border-zinc-500 transition-colors duration-150"></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="block text-[17px] mb-1 tracking-tight">{t("contraseña")}</label>
                            <input required value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="••••••••" 
                            className="w-full px-2 py-2 border rounded-md text-[15px] outline-none focus:border-zinc-500 transition-colors duration-150"></input>
                        </div>

                        <button type="submit" className={`border w-full p-2 rounded-[9px] text-[15px] cursor-pointer mt-1.5 transition duration-400 ${darkMode ? 'hover:bg-zinc-800': 'hover:bg-gray-200'}`}>{t("iniciar_sesion")}</button>

                        <div className="flex items-center gap-2.5 m-3.5">
                            <div className="flex-1 h-[0.5px] bg-zinc-500"></div>
                            <div className="text-[16px] ">o</div>
                            <div className="flex-1 h-[0.5px] bg-zinc-500"></div>
                        </div>

                        <button type="button" onClick={() => setEstaRegistrado(!estaRegistrado)}
                        className={`border w-full p-2 rounded-[9px] text-[15px] cursor-pointer mt-1.5 transition duration-400 ${darkMode ? 'hover:bg-zinc-800': 'hover:bg-gray-200'}`}>{estaRegistrado ? t("inciar_sesion") : t("Crear_una_cuenta_gratis")}</button>
                        </div>
                        
                        
                        </>                    ) : (
                        <>
                         {/*register view */}
                        <div className="flex flex-col justify-center my-2 px-20 py-5 shadow-xl rounded-2xl">
                        <p className="text-[24px] tracking-tighter">{t("crear_cuenta")}</p>
                        <p className="text-[18px]">{t("empieza_gratis_hoy")}</p>
                        
                         <div className="flex flex-col gap-2 mb-3">
                            <label htmlFor="userName"  className="block text-[17px]  mt-3 tracking-tight">{t("nombre_usuario")}</label>
                            <input required value={userName} onChange={(e) => setUserName(e.target.value)} id="userName" type="text" placeholder="anna"
                                className="w-full px-2.25 py-2 border rounded-md text-[15px] outline-none focus:border-zinc-500 transition-colors duration-150"></input>
                        </div>

                        <div className="flex flex-col gap-2 mb-3">
                            <label htmlFor="emaill"  className="block text-[17px] mb-2 tracking-tight">EMAIL</label>
                            <input required value={email} onChange={(e) => setEmail(e.target.value)} id="emaill" type="email" placeholder="nombre@ejemplo.com"
                                className="w-full px-2.25 py-2 border rounded-md text-[15px] outline-none focus:border-zinc-500 transition-colors duration-150"></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordd"  className="block text-[17px] mb-2 tracking-tight">{t("contraseña")}</label>
                            <input required value={password} onChange={(e) => setPassword(e.target.value)} id="passwordd" type="password" placeholder="••••••••"
                                className="w-full px-2.25 py-2 border rounded-md text-[15px] outline-none focus:border-zinc-500 transition-colors duration-150"></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmarPassword"  className="block text-[17px] mb-2 tracking-tight">{t("confirmar_contraseña")}</label>
                            <input required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmarPassword" type="password" placeholder="••••••••"
                                className="w-full px-2.25 py-2 border rounded-md text-[15px] outline-none focus:border-zinc-500 transition-colors duration-150"></input>
                        </div>

                        <button type="submit" className={`border w-full p-2 rounded-[9px] text-[15px] cursor-pointer mt-1.5 transition duration-400 ${darkMode ? 'hover:bg-zinc-800': 'hover:bg-gray-200'}`}>{t("registrarse")}</button>

                        <div className="flex items-center gap-2.5 m-3.5">
                            <div className="flex-1 h-[0.5px] bg-zinc-500"></div>
                            <div className="text-[16px]">o</div>
                            <div className="flex-1 h-[0.5px] bg-zinc-500"></div>
                        </div>

                        <button type="button" className={`border w-full p-2 rounded-[9px] text-[15px] cursor-pointer mt-1.5 transition duration-400 ${darkMode ? 'hover:bg-zinc-800': 'hover:bg-gray-200'}`}
                        onClick={() => setEstaRegistrado(!estaRegistrado)}>{estaRegistrado ? t("ya_tengo_cuenta") : t("crear_una_cuenta_gratis")}</button>
                        </div>
                        </>
                        )}

                    </form>
                </div>

            </div>

        </div>
    )
}