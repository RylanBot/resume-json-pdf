import React from "react";

import useModeStore from "@/stores/modeStore";

interface A4BackgroundProps {
    children: React.ReactNode;
};

const A4Background: React.FC<A4BackgroundProps> = ({ children }) => {

    const { editModeStore } = useModeStore();
    const resumeOffset = editModeStore ? "ml-80" : "";

    return (
        <div className={`print-remove-styles flex flex-col items-center bg-gray-300 overflow-auto ${resumeOffset} transition-all duration-500 ease-in-out`}>
            <div className="print-remove-styles bg-white shadow-xl mt-20 mb-5 resume-font">
                {children}
            </div>
        </div>
    );
};

export default A4Background;