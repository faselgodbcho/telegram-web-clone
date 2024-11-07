import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

const Home = () => {
  const { user, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user && !user.emailVerified) {
      navigate("/confirm");
    }
  }, [user, navigate]);

  if (isAuthLoading) {
    return (
      <div className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full min-h-screen"></div>
    );
  }

  return <div>Home</div>;
};

export default Home;
