import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import DataLoader, { LANG_PACK } from '@/helpers/DataLoader';

function useLocale() {
    const { lang } = useParams();

    useEffect(() => {
        DataLoader(lang || 'en');
    }, [lang]);

    const locale = useMemo(() => {
        return LANG_PACK[lang || 'en'];
    }, [lang]);
    return { locale };
}

export default useLocale;