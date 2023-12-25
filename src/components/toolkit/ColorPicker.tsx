import React from "react";

interface ColorPickerProps {
    color?: string;
    onChange: (newColor: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="px-6 ml-16">
            <input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="w-8 h-8 rounded bg-slate-200 p-0.5 cursor-pointer"
            />
        </div>
    );
};

export default ColorPicker;