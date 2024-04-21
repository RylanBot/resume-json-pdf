import React from "react";

import useModeStore from "@/stores/modeStore";

interface A4BackgroundProps {
    children: React.ReactNode;
}

const A4Background: React.FC<A4BackgroundProps> = ({ children }) => {
    const { editModeStore } = useModeStore();
    return (
        <div id="export-html" className={`print-remove-styles flex flex-col items-center bg-gray-300 overflow-auto ${editModeStore ? "ml-80" : ""} transition-all duration-500 ease-in-out`}>
            <div id="export-page" className="print-remove-styles overflow-hidden mt-24 mb-6">
                {children}
            </div>
        </div>
    );
};

export default A4Background;