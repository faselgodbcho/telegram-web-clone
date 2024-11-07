import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Home, Confirm, Login, NotFound } from "@/pages";
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
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
