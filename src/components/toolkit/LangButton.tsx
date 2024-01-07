import React from 'react';
import { useParams, Link } from 'react-router-dom';

const LangButton: React.FC = () => {
    const { lang } = useParams();

    return (
        <div className='text-sm'>
            <Link
                to="/cn"
                className={`px-2 py-1 ${lang === "cn" ? 'text-[#d6fbff] font-semibold' : 'text-slate-200'}`}
                aria-disabled={lang === "cn"}
            >
                中文版
            </Link>
            <span className='text-slate-600 font-bold'> / </span>
            <Link
                to="/en"
                className={`px-2 py-1 ${lang === "en" ? 'text-[#d6fbff] font-semibold' : 'text-slate-200'}`}
                aria-disabled={lang === "en"}
            >
                ENGLISH
            </Link>
        </div>
    )
}

export default LangButton;