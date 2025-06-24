import { Link, useParams } from 'react-router-dom';

const LangSwitch: React.FC = () => {
    const { lang } = useParams();

    return (
        <div className='text-sm max-sm:text-xs'>
            <Link
                to="/zh"
                className={`px-2 py-1 ${lang === "zh" ? 'text-[#d6fbff] font-semibold' : 'text-slate-200'}`}
                aria-disabled={lang === "zh"}
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

export default LangSwitch;