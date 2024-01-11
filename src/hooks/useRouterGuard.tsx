import { ComponentType } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { JsonInit, VALID_LANG } from '@/helpers/DataLoader';

function useRouterGuard() {

    const useLangGuard = <P extends object>(Component: ComponentType<P>) => {
        return (props: P) => {
            const { lang } = useParams();

            if (!lang || !VALID_LANG.includes(lang)) {
                return <Navigate to="/" replace />;
            } else {
                // 加载简历数据放在这，避免调用 useLocale 时被覆盖
                JsonInit(lang);
            }

            return <Component {...props} />;
        };
    };

    return { useLangGuard };
};

export default useRouterGuard;