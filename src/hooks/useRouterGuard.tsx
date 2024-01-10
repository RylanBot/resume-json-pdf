import { ComponentType } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { VALID_LANG } from '@/helpers/DataLoader';

function useRouterGuard() {

    const useLangGuard = <P extends object>(Component: ComponentType<P>) => {
        return (props: P) => {
            const { lang } = useParams();

            if (!lang || !VALID_LANG.includes(lang)) {
                return <Navigate to="/" replace />;
            }

            return <Component {...props} />;
        };
    };

    return { useLangGuard };
};

export default useRouterGuard;