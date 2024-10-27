import LoginForm from "@/components/form/LoginForm";
import useSystemTheme from "@/hooks/useSystemTheme";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [loginMode, setLoginMode] = useState<boolean>(true);
  const [errorMessages, setErrorMessages] = useState<{
    usernameError: string;
    emailError: string;
    passwordError: string;
  }>({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const [isDarkMode] = useSystemTheme();
  const { user, login, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordType("password");
    setErrorMessages({ usernameError: "", emailError: "", passwordError: "" });
  }, [loginMode]);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    await login(email, password);
  };

  const handleSignUp = async (
    email: string,
    password: string
  ): Promise<void> => {
    await signUp(email, password);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "username":
        if (!/^[a-zA-Z0-9_.]{3,}$/.test(value)) {
          return "Username must be at least 3 characters long and can include letters, numbers, underscores, and periods.";
        }
        break;

      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return "Please enter a valid email address in the format name@provider.com.";
        }
        break;

      case "password":
        if (value.length < 6) {
          return "Password must be at least 6 characters long.";
        }
        if (!/[A-Za-z]/.test(value)) {
          return "Password must contain at least one letter.";
        }
        if (!/\d/.test(value)) {
          return "Password must contain at least one number.";
        }
        break;

      default:
        return "";
    }
    return "";
  };

  const handleUserLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const newErrors: {
      usernameError: string;
      emailError: string;
      passwordError: string;
    } = {
      usernameError: validateField("username", username),
      emailError: validateField("email", email),
      passwordError: validateField("password", password),
    };

    setErrorMessages(newErrors);

    let submitForm: boolean;

    if (loginMode) {
      submitForm = ["emailError", "passwordError"]
        .map((key) =>
          newErrors[key as keyof typeof newErrors].trim().length ? false : true
        )
        .every((value) => value);
    } else {
      submitForm = ["usernameError", "emailError", "passwordError"]
        .map((key) =>
          newErrors[key as keyof typeof newErrors].trim().length ? false : true
        )
        .every((value) => value);
    }

    if (!submitForm) return;
    console.log("form submitted");

    try {
      if (loginMode) {
        handleLogin(email, password);
      } else {
        handleSignUp(email, password);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const framerAnimationProvider = (loginMode: boolean, formType: string) => {
    if (loginMode && formType === "login") {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, x: -100 },
        transition: { duration: 0.3 },
      };
    }
    if (loginMode && formType === "signup") {
      return {
        initial: { opacity: 1, x: 100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8 },
      };
    }
    if (!loginMode && formType === "login") {
      return {
        initial: { opacity: 1, x: 100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8 },
      };
    }
    if (!loginMode && formType === "signup") {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, x: -100 },
        transition: { duration: 0.3 },
      };
    }
  };

  useEffect(() => {
    if (user && user.emailVerified) {
      navigate("/home");
    }

    if (user && !user.emailVerified) {
      navigate("/confirm");
    }
  }, [user, navigate]);

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

        <AnimatePresence mode="wait">
          {loginMode ? (
            <motion.div
              key="login"
              {...framerAnimationProvider(loginMode, "login")}
            >
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
                errorMessages={errorMessages}
                setErrorMessages={setErrorMessages}
                validateField={validateField}
              />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              {...framerAnimationProvider(loginMode, "signup")}
            >
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
                errorMessages={errorMessages}
                setErrorMessages={setErrorMessages}
                validateField={validateField}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
