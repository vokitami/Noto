import { useTranslation } from "react-i18next";

export default function LanguageSwitcher(){
    const {i18n} = useTranslation();

    const handleLanguageChange = (e) => i18n.changeLanguage(e.target.value);

    return(
        <div className="flex gap-2">
    <button 
        onClick={() => i18n.changeLanguage("es")}
        className={i18n.language === "es" ? "font-bold" : "text-zinc-500"}
    >
        ES
    </button>
    <span>|</span>
    <button 
        onClick={() => i18n.changeLanguage("en")}
        className={i18n.language === "en" ? "font-bold" : "text-zinc-500"}
    >
        EN
    </button>
</div>
    )

}