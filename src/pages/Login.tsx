import useSystemTheme from "@/hooks/useSystemTheme";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordType, setPasswordType] = useState<string>("password");
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
          Sign in to Telegram
        </h2>

        <p className="text-faded-gray mt-4 text-[16px] text-center">
          Please enter your email and password to continue using the telegram
          web clone
        </p>

        <form className="mt-6" onSubmit={handleUserLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-[13px] ps-[20px] focus:ps-[19px] focus:p-[12px] text-lg outline-none rounded-xl bg-transparent border border-[#2f2f2f] dark:hover:border-secondary-dark dark:focus:border-secondary-dark hover:border-secondary-light focus:border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <input
              type={passwordType}
              placeholder="Password"
              className="w-full  p-[13px] ps-[20px] focus:ps-[19px] focus:p-[12px] text-lg outline-none rounded-xl bg-transparent border border-[#2f2f2f] dark:hover:border-secondary-dark dark:focus:border-secondary-dark hover:border-secondary-light focus:border-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className="w-full p-3 dark:bg-secondary-dark bg-secondary-light text-primary-light font-medium rounded-xl mt-4 text-lg hover:bg-opacity-80"
          >
            Login
          </button>

          <p className="text-center mt-3 text-faded-gray">
            Don't have an account? &nbsp;
            <a
              href="#"
              className="dark:text-secondary-dark text-secondary-light hover:opacity-75"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
