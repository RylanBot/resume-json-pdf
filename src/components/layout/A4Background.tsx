import { ReactNode } from "react";
import useModeStore from "@/stores/modeStore";

interface A4BackgroundProps {
  page: number;
  children: ReactNode;
}

const A4Background: React.FC<A4BackgroundProps> = ({ page, children }) => {
  const { isEditMode } = useModeStore();
  return (
    <div
      className={`print-remove-styles flex flex-col items-center bg-gray-300 overflow-auto max-sm:overflow-hidden transition-all duration-500 ease-in-out ${
        isEditMode ? "md:ml-80" : ""
      } ${page > 1 ? "max-sm:-mt-[625px]" : ""}`}
    >
      <div
        className={`export-page print-remove-styles mb-6 max-sm:scale-[0.4] ${
          page > 1 ? "" : "mt-24 max-sm:-mt-56"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default A4Background;
