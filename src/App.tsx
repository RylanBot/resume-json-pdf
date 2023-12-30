import Dashboard from "@/pages/Dashboard";
import { useMessageHandler } from "@/hooks/useMessageHandler";

function App() {
  const { contextHolder } = useMessageHandler();

  return (
    <>
      {contextHolder}
      <Dashboard />
    </>
  )
}

export default App