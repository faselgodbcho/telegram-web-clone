import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

type LoginFormProps = {
  loginMode: boolean;
  setLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
  setUsername?: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleUserLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  passwordType: "text" | "password";
  setPasswordType: React.Dispatch<React.SetStateAction<"text" | "password">>;
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
  validateField: (name: string, value: string) => string;
};

const LoginForm = ({
  loginMode,
  setLoginMode,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  handleUserLogin,
  passwordType,
  setPasswordType,
  errorMessages,
  setErrorMessages,
  validateField,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (setUsername) {
      if (name === "username") setUsername(value);
    }
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

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
            value={username}
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
          value={email}
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
            value={password}
            onChange={handleInputChange}
            onBlur={handleFocusBlur}
            required
          />
          <span
            className={`absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 ${password.trim().length <= 0 && "hidden"} hidden group-focus:block group-hover:block`}
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
        className="w-full p-3 dark:bg-secondary-dark bg-secondary-light text-primary-light font-medium rounded-xl mt-4 text-lg hover:bg-opacity-80"
      >
        Next
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
