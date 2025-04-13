import Authorization from "./components/Authorization";
import { Toaster } from "./components/ui/sonner.tsx";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Authorization />
    </>
  );
}

export default App;
