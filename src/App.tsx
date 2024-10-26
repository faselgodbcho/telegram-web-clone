import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
