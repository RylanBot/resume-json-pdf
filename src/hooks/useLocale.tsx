import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Locale } from '@/types/locale';

import LangEN from '@/locales/en-US';
import LangCN from '@/locales/zh-CN';

function useLocale() {
    const { lang } = useParams();

    const locale = useMemo<Locale>(() => {
        return lang === 'cn' ? LangCN : LangEN;
    }, [lang]);

    return { locale };
}

export default useLocale;