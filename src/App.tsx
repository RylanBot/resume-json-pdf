import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import useMessageHandler from '@/hooks/useMessageHandler';
import useRouterGuard from '@/hooks/useRouterGuard';

import Dashboard from "@/pages/Dashboard";
import LangRedirect from '@/pages/LangRedirect';

function App() {
  const { messageContext } = useMessageHandler();

  const { useLangGuard } = useRouterGuard();
  const GuardedDashboard = useLangGuard(Dashboard);

  return (
    <>
      {messageContext}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LangRedirect />} />
          <Route path="/:lang" element={<GuardedDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;