import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "@/components/ui/toaster";
import Confirm from "./pages/Confirm";
import Home from "./pages/Home";
import useAuth from "@/hooks/useAuth";

const App = () => {
  const { isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full min-h-screen"></div>
    );
  }

  return (
    <div className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
