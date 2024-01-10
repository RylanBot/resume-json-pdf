import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { VALID_LANG } from "@/helpers/DataLoader";

const LangRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 游览器默认语言
        const browserLang = navigator.language.split('-')[0];
        if (VALID_LANG.includes(browserLang)) {
            navigate(`/${browserLang}`, { replace: true });
        } else {
            navigate("/en", { replace: true });
        }
    }, []);

    return <></>
}

export default LangRedirect;