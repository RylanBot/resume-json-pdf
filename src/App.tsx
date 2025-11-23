import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { withLangGuard } from "@/hooks/useRouterGuard";

import Dashboard from "@/pages/Dashboard";
import LangRedirect from "@/pages/LangRedirect";

function App() {
  const GuardedDashboard = withLangGuard(Dashboard);

  return (
    <>
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
