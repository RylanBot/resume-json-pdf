import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { version } from "@/../package.json";
import useLocale from "@/hooks/useLocale";

const LOCAL_NOTICE_KEY = "notice-version";

const LatestNotice = () => {
  const { locale } = useLocale();
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem(LOCAL_NOTICE_KEY);
    if (lastSeenVersion !== version) {
      setShowNotice(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(LOCAL_NOTICE_KEY, version);
    setShowNotice(false);
  };

  return (
    <>
      {showNotice && (
        <div className="fixed top-72 right-10 bg-slate-500 text-white w-64 p-4 rounded-lg shadow-md max-sm:hidden">
          <div className="flex justify-center items-center mb-4">
            <p className="font-bold text-lg font-serif italic">
              <span>Notice </span>
              <span className="text-sky-200 font-bold text-sm italic">
                - {version}
              </span>
            </p>
            <button className="ml-auto text-2xl hover:text-sky-100" onClick={handleClose}>
              <IoIosCloseCircleOutline />
            </button>
          </div>
          <strong>{locale.common.LATEST_NOTICE}</strong>
          <p className="mt-2 text-sm">
            <a
              className="hover:text-sky-200"
              href={`https://github.com/RylanBot/resume-json-pdf/blob/main/${locale.common.CHANGELOG_FILE}`}
              rel="noreferrer"
              target="_blank"
            >
              ({locale.common.CHANGELOG_VIEW})
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default LatestNotice;
