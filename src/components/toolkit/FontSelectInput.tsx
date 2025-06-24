import { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { AVAILABLE_FONTS } from "@/data";
import useLocale from "@/hooks/useLocale";

interface FontSelectInputProps {
  font: string;
  onChange: (newValue: string) => void;
}

const FontSelectInput: React.FC<FontSelectInputProps> = ({
  font,
  onChange,
}) => {
  const { locale } = useLocale();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFont = e.target.value;
    onChange(newFont);
  };

  const handleFontSelect = (font: string) => {
    onChange(font);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="flex">
      <input
        className="w-40 p-1 mr-3 border border-gray-300 text-sm max-sm:text-xs"
        value={font}
        placeholder={locale.field.FONT_PLACEHOLDER}
        onChange={handleFontChange}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <div className="w-40 absolute bg-white border border-gray-300 mt-8 rounded-md">
          <ul>
            {AVAILABLE_FONTS.map((font) => (
              <li
                key={font}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                style={{ fontFamily: font }}
                onClick={() => handleFontSelect(font)}
              >
                {font}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="text-lg text-slate-600 hover:text-slate-400"
        onClick={() => handleFontSelect("")}
      >
        <IoIosCloseCircleOutline />
      </button>
    </div>
  );
};

export default FontSelectInput;
