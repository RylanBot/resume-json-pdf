import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useMessageHandler } from '@/hooks/useMessageHandler';
import DataLoader, { validLangs } from '@/helpers/DataLoader';
import Dashboard from "@/pages/Dashboard";

function App() {
  const { messageContext } = useMessageHandler();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const currentLang = pathParts[1];

    if (!validLangs.includes(currentLang)) {
      const browserLang = navigator.language.split('-')[0];
      const defaultLang = browserLang === 'zh' ? 'cn' : 'en';
      navigate(`/${defaultLang}`, { replace: true });
    } else {
      DataLoader(currentLang)
    }
  }, [location, navigate]);

  return (
    <>
      {messageContext}
      <Routes>
        <Route path="/" element={<Navigate to="/:lang" />}></Route>
        <Route path="/:lang" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;