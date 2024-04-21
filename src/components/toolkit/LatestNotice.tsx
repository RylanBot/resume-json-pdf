import { useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import useLocale from '@/hooks/useLocale';

const LatestNotice = () => {
    const { locale } = useLocale();
    const [showNotice, setShowNotice] = useState(true);

    useEffect(() => {
        const hasRead = localStorage.getItem('notice-read');
        if (hasRead === 'true') {
            setShowNotice(false);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('notice-read', 'true');
        setShowNotice(false);
    };

    return (
        <>
            {showNotice && (
                <div className='fixed top-60 right-12 bg-sky-700 text-white w-40 p-4 rounded-lg shadow-md font-serif'>
                    <div className='flex justify-center items-center mb-4'>
                        <p className='font-bold text-lg'>Notice</p>
                        <button
                            className='ml-auto'
                            onClick={handleClose}
                        >
                            <IoIosCloseCircleOutline />
                        </button>
                    </div>
                    <p>{locale.common.LATEST_NOTICE}</p>
                </div>
            )}
        </>
    );
};

export default LatestNotice;