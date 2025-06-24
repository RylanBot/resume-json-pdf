import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { LOCALE } from '@/helpers/DataLoader';

function useLocale() {
    const { lang } = useParams();

    const locale = useMemo(() => {
        return LOCALE[lang || 'en'];
    }, [lang]);
    return { locale };
}

export default useLocale;