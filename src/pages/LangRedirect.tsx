import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { VALID_LANG } from "@/helpers/DataLoader";

const LangRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 获取浏览器默认语言
        const browserLang = navigator.language.split('-')[0];

        const langToUse = VALID_LANG.includes(browserLang) ? browserLang : 'en';

        navigate(`/${langToUse}`, { replace: true });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <></>
}

export default LangRedirect;