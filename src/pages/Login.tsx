import LoginForm from "@/components/form/LoginForm";
import useSystemTheme from "@/hooks/useSystemTheme";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import validateField from "@/utils/fieldValidator";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
    username: string;
  }>({ username: "", email: "", password: "" });

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

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => await login(email, password),
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => await signUp(email, password),
    onError: (error) => {
      console.error("Sign-up failed:", error);
    },
  });

  const handleUserLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const newErrors: {
      usernameError: string;
      emailError: string;
      passwordError: string;
    } = {
      usernameError: validateField("username", formValues.username),
      emailError: validateField("email", formValues.email),
      passwordError: validateField("password", formValues.password),
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
        loginMutation.mutate({
          email: formValues.email,
          password: formValues.password,
        });
      } else {
        signUpMutation.mutate({
          email: formValues.email,
          password: formValues.password,
        });
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
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 },
      };
    }
    if (!loginMode && formType === "signup") {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, x: 100 },
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
                formValues={formValues}
                setFormValues={setFormValues}
                handleUserLogin={handleUserLogin}
                errorMessages={errorMessages}
                setErrorMessages={setErrorMessages}
                loggingIn={loginMutation.isPending}
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
                formValues={formValues}
                setFormValues={setFormValues}
                handleUserLogin={handleUserLogin}
                errorMessages={errorMessages}
                setErrorMessages={setErrorMessages}
                loggingIn={signUpMutation.isPending}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
