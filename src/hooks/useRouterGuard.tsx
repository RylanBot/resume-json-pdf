import { ComponentType, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { initResumeData, VALID_LANG } from '@/helpers/DataLoader';

function useLangGuard() {
    const { lang } = useParams();

    useEffect(() => {
        // 加载简历数据放在这，避免调用 useLocale 时被覆盖
        // 要确保数据加载成功再渲染组件，否则更新 store 会报错
        if (lang && VALID_LANG.includes(lang)) {
            initResumeData(lang);
        }
    }, [lang]);

    const isValidLang = lang && VALID_LANG.includes(lang);

    return { isValidLang, lang };
}

export const withLangGuard = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => {
        const { isValidLang, lang } = useLangGuard();

        // 将高阶组件和自定义 Hook 分开，避免报错
        // 'hooks are being called inside a callback function, which is not allowed'
        if (!isValidLang) {
            return <Navigate to="/" replace />;
        }

        return <Component {...props} lang={lang} />;
    };
}