import React, { useRef } from "react";

interface CustomImageProps {
    src: string,
    editMode: boolean,
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomImage: React.FC<CustomImageProps> = ({ src, editMode, onImageChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        if (editMode && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const cursorStyle = editMode ? "cursor-pointer" : "";
    return (
        <div onClick={handleImageClick} className={cursorStyle}>
            {editMode && <input type="file" ref={fileInputRef} onChange={onImageChange} className="hidden" />}
            <div className="w-[85px] h-[100px] mr-6 mb-2">
                <img width={85} height={100} src={src} alt="avatar" className='w-full h-full' />
            </div>
        </div>
    );
};

export default CustomImage;