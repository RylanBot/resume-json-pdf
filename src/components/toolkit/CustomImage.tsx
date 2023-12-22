import { ProfileData } from '@/stores/profile';
import useStore from '@/stores/store';
import React, { useRef } from 'react';

const CustomImage: React.FC<{ src: string }> = ({ src }) => {
    const { profileStore, setProfileStore } = useStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const newProfileData: ProfileData = {
                    avatar: base64String,
                    name: profileStore!.name,
                    footnote: profileStore!.footnote,
                    info: profileStore!.info
                };
                setProfileStore(newProfileData);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div onClick={handleImageClick}>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <div className="w-[85px] h-[100px] mr-6 mb-2">
                <img width={85} height={100} src={src} alt="avatar" className='w-full h-full cursor-pointer' />
            </div>
        </div>
    );
};

export default CustomImage;