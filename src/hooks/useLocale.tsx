import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { LANG_PACK } from '@/helpers/DataLoader';

function useLocale() {
    const { lang } = useParams();

    const locale = useMemo(() => {
        return LANG_PACK[lang || 'en'];
    }, [lang]);
    return { locale };
}

export default useLocale;