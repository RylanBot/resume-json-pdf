import React from "react";
import { RiFilePdf2Line } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";

import { messageContainer } from "@/helpers/MessageContainer";

interface PrintPdfButtonProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const PrintPdfButton: React.FC<PrintPdfButtonProps> = ({ printRef }) => {
  const invokePrinter = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrint = () => {
    if (!(typeof window.print === "function" && "mediaDevices" in navigator)) {
      messageContainer.info("Browser does not support it.");
      return;
    }

    invokePrinter();
  };

  return (
    <button
      onClick={handlePrint}
      className="p-2 text-sm font-semibold bg-white text-slate-800"
    >
      <div className="flex items-center px-5 py-1">
        <RiFilePdf2Line className="mr-4" />
        <span className="text-xs">PDF</span>
      </div>
    </button>
  );
};

export default PrintPdfButton;
