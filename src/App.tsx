import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useMessageHandler } from '@/hooks/useMessageHandler';

import Dashboard from "@/pages/Dashboard";
import LangRedirect from '@/pages/LangRedirect';

function App() {
  const { messageContext } = useMessageHandler();

  return (
    <>
      {messageContext}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LangRedirect />} />
          <Route path="/:lang" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;