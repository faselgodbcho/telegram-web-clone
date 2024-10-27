import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthErrorCodes, sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";

const Confirm = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const resendEmailVerification = async (): Promise<void> => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to re-send a verification email.",
        variant: "destructive",
        className:
          "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg",
      });

      return;
    }

    try {
      await sendEmailVerification(user);
      toast({
        title: "Verification Sent",
        description:
          "Email verification successfully sent. Please verify to continue.",
        variant: "destructive",
        className:
          "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg",
      });
    } catch (e) {
      console.error(e);

      if (e instanceof Error && "code" in e) {
        switch (e.code) {
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            toast({
              title: "Error",
              description: "Too many request. Please try again later.",
              variant: "destructive",
              className:
                "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg",
            });
            break;
        }
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.emailVerified) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description:
          "Sorry, you can't edit your email. Please try again later.",
        variant: "destructive",
        className:
          "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg",
      });
    }
  };

  return (
    <div className="w-full min-h-screen px-4 select-none min-[1450px]:flex items-center justify-center">
      <div className="max-w-[360px] w-full mx-auto pt-32">
        <h2 className="text-3xl font-medium mt-8 text-center flex gap-2 items-center justify-center">
          {user?.email || ""}
          <span onClick={handleLogout}>
            <MdOutlineEdit
              size="0.8em"
              className="text-[#AAA] hover:dark:text-white cursor-pointer hover:text-black transition-colors"
            />
          </span>
        </h2>

        <p className="mt-4 dark:text-faded-gray text-[#707579] text-center">
          A confirmation link has been sent to your email. Please check your
          inbox to complete the verification.
        </p>

        <p className="mt-4 dark:text-faded-gray text-[#707579] text-center">
          Didn’t receive the email? Check your spam folder or click below to
          resend.
        </p>

        <button
          className="w-full p-3 dark:bg-secondary-dark bg-secondary-light text-primary-light font-medium rounded-xl mt-4 text-lg hover:bg-opacity-80"
          onClick={resendEmailVerification}
        >
          Resend
        </button>
      </div>
    </div>
  );
};

export default Confirm;
