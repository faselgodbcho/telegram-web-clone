import LoginForm from "@/components/form/LoginForm";
import useSystemTheme from "@/hooks/useSystemTheme";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [loginMode, setLoginMode] = useState<boolean>(false);
  const [isDarkMode] = useSystemTheme();

  const handleUserLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="w-full min-h-screen px-4 select-none min-[1450px]:flex items-center justify-center">
      <div className="max-w-[360px] w-full mx-auto pt-12">
        <div className="max-w-[160px] mx-auto">
          <img
            src={
              isDarkMode
                ? "/images/telegram-dark.svg"
                : "/images/telegram-light.svg"
            }
            className="w-full"
          />
        </div>

        <h2 className="text-3xl font-medium mt-8 text-center">
          {loginMode ? "Sign in to Telegram" : "Sign up to Telegram"}
        </h2>

        <p className="text-faded-gray mt-4 text-[16px] text-center">
          {loginMode
            ? "Please enter your email and password to continue using the telegram web clone"
            : "Hello 👋, Let's get you signed up for the telegram web clone. please enter your credentials below."}
        </p>

        {loginMode ? (
          <LoginForm
            loginMode={loginMode}
            setLoginMode={setLoginMode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleUserLogin={handleUserLogin}
            passwordType={passwordType}
            setPasswordType={setPasswordType}
          />
        ) : (
          <LoginForm
            loginMode={loginMode}
            setLoginMode={setLoginMode}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleUserLogin={handleUserLogin}
            passwordType={passwordType}
            setPasswordType={setPasswordType}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
