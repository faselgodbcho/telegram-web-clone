import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
