import useAuth from "@/hooks/useAuth";
import { useNavigate, Outlet } from "react-router-dom";
import { useLayoutEffect } from "react";
import { ChatSidebar } from "@/components/chat";

const Chat = () => {
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

  return (
    <div className="bg-gradient-to-br dark:via-[rgba(135,116,225,0.2)] dark:from-[rgba(178,166,235,0.2)] dark:to-[rgba(255,89,90,0.2)] via-[#91b988] from-[#cfd68c] to-[rgba(215,219,185,0.7)] relative w-full h-screen">
      <div className="absolute inset-0 flex w-full h-full bg-cover bg-center md:bg-contain dark:bg-blend-darken dark:mix-blend-normal mix-blend-soft-light md:dark:bg-[url('/images/telegram-dark-bg.png')] dark:bg-[url('/images/telegram-dark-bg-sm.png')] md:bg-[url('/images/telegram-light-bg.png')] bg-[url('/images/telegram-light-bg-sm.png')]"></div>

      <div className="relative z-10 flex w-full h-full">
        <ChatSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
