import { ReactNode } from "react";
import useModeStore from "@/stores/modeStore";

interface A4BackgroundProps {
  children: ReactNode;
}

const A4Background: React.FC<A4BackgroundProps> = ({ children }) => {
  const { editModeStore } = useModeStore();
  return (
    <div
      id="export-html"
      className={`print-remove-styles flex flex-col items-center bg-gray-300 overflow-auto max-sm:h-screen max-sm:overflow-hidden transition-all duration-500 ease-in-out ${
        editModeStore ? "md:ml-80" : ""
      } `}
    >
      <div
        id="export-page"
        className={`print-remove-styles mt-24 md:mb-6 max-sm:scale-[0.4] ${
          editModeStore ? "max-sm:-mt-64" : "max-sm:-mt-56"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default A4Background;
