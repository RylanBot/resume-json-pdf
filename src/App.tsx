import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { loadResumeData } from "@/helpers/LocaleService";
import { useMessageHandler } from '@/hooks/useMessageHandler';
import Dashboard from "@/pages/Dashboard";

function App() {
  const { messageContext } = useMessageHandler();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const currentLang = pathParts[1];

    const validLangs = ['en', 'cn'];
    // 默认重定向到游览器语言
    if (!validLangs.includes(currentLang)) {
      const browserLang = navigator.language.split('-')[0];
      const defaultLang = browserLang === 'zh' ? 'cn' : 'en';

      navigate(`/${defaultLang}`, { replace: true });
    } else {
      // 或者手动修改 URL
      loadResumeData(currentLang);
    }
  }, [location]);

  return (
    <>
      {messageContext}
      <Routes>
        <Route path="/:lang" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;