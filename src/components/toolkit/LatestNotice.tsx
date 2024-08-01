import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import useLocale from "@/hooks/useLocale";

import { version } from "@/../package.json";

const LatestNotice = () => {
  const { locale } = useLocale();
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem("notice-version");
    if (lastSeenVersion !== version) {
      setShowNotice(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("notice-version", version);
    setShowNotice(false);
  };

  return (
    <>
      {showNotice && (
        <div id="latest-notice" className="fixed top-72 right-12 bg-slate-500 text-white w-40 p-4 rounded-lg shadow-md max-sm:hidden">
          <div className="flex justify-center items-center mb-4">
            <p className="font-bold text-lg font-serif italic">Notice</p>
            <button className="ml-auto" onClick={handleClose}>
              <IoIosCloseCircleOutline />
            </button>
          </div>
          <p>
            {locale.common.LATEST_NOTICE}
            <span className="text-sky-200 font-bold text-sm italic">
              - v{version}
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default LatestNotice;
