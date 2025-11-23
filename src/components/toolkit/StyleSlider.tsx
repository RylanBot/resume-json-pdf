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
                className="w-full max-sm:w-40 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
            />
            <div className="text-center mt-2">
                <span className="font-mono font-semibold italic text-slate-800 text-sm max-sm:text-xs">{value} px</span>
            </div>
        </div>
    );
};

export default StyleSlider;
