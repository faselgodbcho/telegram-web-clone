import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import validateField from "@/utils/fieldValidator";

type LoginFormProps = {
  loginMode: boolean;
  setLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleUserLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errorMessages: {
    usernameError: string;
    emailError: string;
    passwordError: string;
  };
  setErrorMessages: React.Dispatch<
    React.SetStateAction<{
      usernameError: string;
      emailError: string;
      passwordError: string;
    }>
  >;
  loggingIn: boolean;
  formValues: { username: string; email: string; password: string };
  setFormValues: React.Dispatch<
    React.SetStateAction<{ username: string; email: string; password: string }>
  >;
};

const LoginForm = ({
  loginMode,
  setLoginMode,
  formValues,
  setFormValues,
  handleUserLogin,
  errorMessages,
  setErrorMessages,
  loggingIn,
}: LoginFormProps) => {
  const [focusFromBlur, setFocusFromBlur] = useState<{
    username: boolean;
    email: boolean;
    password: boolean;
  }>({
    username: false,
    email: false,
    password: false,
  });
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  useEffect(() => {
    setPasswordType("password");
    setErrorMessages({ usernameError: "", emailError: "", passwordError: "" });
  }, [loginMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (focusFromBlur[name as keyof typeof focusFromBlur]) {
      setErrorMessages((prev) => ({
        ...prev,
        [name + "Error"]: validateField(name, value),
      }));
    }
  };

  const handleFocusBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFocusFromBlur({ ...focusFromBlur, [name]: true });

    setErrorMessages((prev) => ({
      ...prev,
      [name + "Error"]: validateField(name, value),
    }));
  };

  return (
    <form className="mt-6 pb-4" onSubmit={handleUserLogin} noValidate>
      {!loginMode && (
        <div className="mb-4">
          <input
            type="username"
            placeholder="Username"
            className="w-full p-[13px] ps-[20px] focus:ps-[19px] focus:p-[12px] text-lg outline-none rounded-xl bg-transparent border dark:border-[#2f2f2f] border-[#AAA] dark:hover:border-secondary-dark dark:focus:border-secondary-dark hover:border-secondary-light focus:border-2"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            onBlur={handleFocusBlur}
            required
          />

          <p className="text-red-500 mt-2 ps-2 text-sm">
            {errorMessages.usernameError}
          </p>
        </div>
      )}

      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-[13px] ps-[20px] focus:ps-[19px] focus:p-[12px] text-lg outline-none rounded-xl bg-transparent border dark:border-[#2f2f2f] border-[#AAA] dark:hover:border-secondary-dark dark:focus:border-secondary-dark hover:border-secondary-light focus:border-2"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          onBlur={handleFocusBlur}
          required
        />
        <p className="text-red-500 mt-2 text-sm ps-2">
          {errorMessages.emailError}
        </p>
      </div>

      <div>
        <div className="group relative">
          <input
            type={passwordType}
            placeholder="Password"
            className="w-full p-[13px] ps-[20px] focus:ps-[19px] focus:p-[12px] text-lg outline-none rounded-xl bg-transparent border dark:border-[#2f2f2f] border-[#AAA] dark:hover:border-secondary-dark dark:focus:border-secondary-dark hover:border-secondary-light focus:border-2"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            onBlur={handleFocusBlur}
            required
          />
          <span
            className={`absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 ${formValues.password.trim().length <= 0 && "hidden"} hidden group-focus:block group-hover:block`}
          >
            <Eye
              className={`text-faded-gray ${passwordType === "text" && "hidden"}`}
              onClick={() => setPasswordType("text")}
            />
            <EyeClosed
              className={`text-faded-gray ${passwordType === "password" && "hidden"}`}
              onClick={() => setPasswordType("password")}
            />
          </span>
        </div>

        <p className="text-red-500 mt-2 ps-2 text-sm">
          {errorMessages.passwordError}
        </p>
      </div>

      <button
        type="submit"
        disabled={loggingIn}
        className={`w-full p-3 dark:bg-secondary-dark bg-secondary-light text-primary-light font-medium rounded-xl mt-4 text-lg  flex justify-center gap-4 items-center ${!loggingIn ? "hover:bg-opacity-80" : "disabled:bg-opacity-70 cursor-not-allowed"}`}
      >
        {loggingIn ? "Please wait" : "Next"}
        {loggingIn && <LoaderCircle className="animate-spin" />}
      </button>

      <p className="text-center mt-3 text-faded-gray">
        {loginMode ? "Don't have an account?" : "Already have an account?"}
        &nbsp;
        <a
          className="dark:text-secondary-dark cursor-pointer text-secondary-light hover:opacity-75"
          onClick={() => setLoginMode((prev) => !prev)}
        >
          {loginMode ? "Sign Up" : "Login"}
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
