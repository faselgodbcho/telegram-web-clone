import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Home, Confirm, Login, NotFound } from "@/pages";
import useAuth from "@/hooks/useAuth";
import ChatLayout from "./layouts/ChatLayout";

const App = () => {
  const { isAuthLoading, user } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full min-h-screen"></div>
    );
  }

  const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/" element={<ChatLayout />}>
          {/* <Route
        <ProtectedRoute>
            path=":username"
            element={
                <ChatBody />
              }
        </ProtectedRoute>
              /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
