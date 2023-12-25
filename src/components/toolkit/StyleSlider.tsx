import React from 'react';

interface StyleSliderProps {
    min: number;
    max: number
    value?: number;
    onChange: (newValue: number) => void;
}

const StyleSlider: React.FC<StyleSliderProps> = ({ min, max, value, onChange }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
                <span className="font-mono font-semibold italic">{value}px</span>
            </div>
        </div>
    );
};

export default StyleSlider;
