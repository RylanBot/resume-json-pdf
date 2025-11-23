import useLocale from "@/hooks/useLocale";
import useModeStore from "@/stores/modeStore";

interface ToggleBtnProps {
  active: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const ToggleButton = ({ active, children, onClick }: ToggleBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-2 py-1 font-semibold rounded-md transition-all ${
        active
          ? "bg-white text-slate-800 shadow-md"
          : "bg-transparent text-slate-800"
      }`}
    >
      <div className="flex justify-center items-center gap-4">{children}</div>
    </button>
  );
};

const EditorModeToggle = () => {
  const { locale } = useLocale();
  const { isJsonMode, setIsJsonMode } = useModeStore();

  return (
    <div className="flex w-96 max-md:w-32 mx-6 px-2 py-1 text-xs bg-slate-100 rounded-md shadow-md max-sm:scale-75">
      <ToggleButton active={!isJsonMode} onClick={() => setIsJsonMode(false)}>
        <i className="fa-regular fa-eye"></i>
        <span className="max-md:hidden">{locale.common.VISUALIZATION}</span>
      </ToggleButton>
      <ToggleButton active={isJsonMode} onClick={() => setIsJsonMode(true)}>
        <i className="fa-solid fa-code"></i>
        <span className="max-md:hidden">{locale.common.SOURCE}</span>
      </ToggleButton>
    </div>
  );
};

export default EditorModeToggle;
