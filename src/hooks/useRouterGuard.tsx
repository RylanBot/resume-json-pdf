import { ComponentType, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { JsonInit, VALID_LANG } from '@/helpers/DataLoader';

function useRouterGuard() {

    const useLangGuard = <P extends object>(Component: ComponentType<P>) => {
        return (props: P) => {
            const { lang } = useParams();

            // 加载简历数据放在这，避免调用 useLocale 时被覆盖
            // 要确保数据加载成功再渲染组件，否则更新 store 会报错
            useEffect(() => {
                if (lang && VALID_LANG.includes(lang)) {
                    JsonInit(lang);
                }
            }, [lang]);
        
            if (!lang || !VALID_LANG.includes(lang)) {
                return <Navigate to="/" replace />;
            }

            return <Component {...props} />;
        };
    };

    return { useLangGuard };
};

export default useRouterGuard;