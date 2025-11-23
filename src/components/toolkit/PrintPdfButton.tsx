import { RiFilePdf2Line } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";

import { messageContainer } from "@/helpers/MessageContainer";

interface PrintPdfButtonProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const PrintPdfButton: React.FC<PrintPdfButtonProps> = ({ printRef }) => {
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforePrint() {
      window.printStart = Date.now();
    },
    onAfterPrint() {
      // 某些游览器没有弹出打印框，但依旧触发 onAfterPrint
      // eslint-disable-next-line prefer-const
      let printEnd = Date.now();
      if (!window.printStart || printEnd - window.printStart < 1000) {
        messageContainer.info("Failed to print PDF");
      }
    }
  });

  return (
    <button
      className="w-full p-2 rounded-bl-sm rounded-br-sm hover:bg-slate-100"
      onClick={handlePrint}
    >
      <div className="flex items-center px-5 py-1">
        <RiFilePdf2Line className="mr-4" />
        <span className="text-xs">PDF</span>
      </div>
    </button>
  );
};

export default PrintPdfButton;
