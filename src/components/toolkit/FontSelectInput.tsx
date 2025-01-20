import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

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

  const checkFontAvailability = (font: string) => {
    const testString = "abcdefghijklmnopqrstuvwxyz0123456789";
    const testElement = document.createElement("span");

    testElement.style.fontSize = "12px";
    testElement.style.visibility = "hidden";
    testElement.textContent = testString;

    document.body.appendChild(testElement);
    const defaultWidth = testElement.offsetWidth;

    testElement.style.fontFamily = font;
    const fontWidth = testElement.offsetWidth;

    document.body.removeChild(testElement);

    // 宽度不同说明字体可用
    return defaultWidth !== fontWidth;
  };

  const FONT_LIST = [
    "Arial",
    "Calibri",
    "Courier New",
    "FangSong",
    "STZhongsong",
    "Times New Roman",
  ].filter((font) => checkFontAvailability(font));

  return (
    <div ref={wrapperRef} className="flex">
      <input
        value={font}
        onChange={handleFontChange}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-40 p-1 mr-3 border border-gray-300 text-sm max-sm:text-xs"
        placeholder={locale.field.FONT_PLACEHOLDER}
      />
      {isDropdownOpen && (
        <div className="w-40 absolute bg-white border border-gray-300 mt-8 rounded-md">
          <ul>
            {FONT_LIST.map((font) => (
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
        onClick={() => handleFontSelect("")}
        className="text-lg text-slate-600 hover:text-slate-400"
      >
        <IoIosCloseCircleOutline />
      </button>
    </div>
  );
};

export default FontSelectInput;
