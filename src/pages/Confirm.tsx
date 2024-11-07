import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useCustomToaster from "@/hooks/useCustomToaster";
import { sendEmailVerification } from "firebase/auth";
import { useState, useLayoutEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { LoaderCircle } from "lucide-react";
import authErrorHandler from "@/utils/authErrorHandler";
import { useMutation } from "@tanstack/react-query";

const Confirm = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthLoading } = useAuth();
  const { showToast } = useCustomToaster();

  const resendEmailMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not logged in.");
      await sendEmailVerification(user);
    },
    onSuccess: () => {
      showToast(
        "Verification Sent",
        "Email verification successfully sent. Please check your inbox or spam folders."
      );
    },
    onError: (error) => {
      console.error(error);
      authErrorHandler(error, showToast);
    },
  });

  useLayoutEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user && user.emailVerified) {
      navigate("/home");
    }
  }, [user, navigate]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logout();
    },
    onError: (error) => {
      console.error(error);
      showToast(
        "Error",
        "Sorry, you can't edit your email. Please try again later."
      );
    },
  });

  if (isAuthLoading) {
    return (
      <div className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light w-full min-h-screen"></div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 select-none min-[1450px]:flex items-center justify-center">
      <div className="max-w-[360px] w-full mx-auto pt-32">
        <h2 className="text-3xl font-medium mt-8 text-center flex gap-2 items-center justify-center">
          {user?.email || ""}
          <span onClick={() => logoutMutation.mutate()}>
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
          className={`w-full p-3 dark:bg-secondary-dark bg-secondary-light text-primary-light font-medium rounded-xl mt-4 text-lg  flex justify-center gap-4 items-center  ${!resendEmailMutation.isPending ? "hover:bg-opacity-80" : "disabled:bg-opacity-70 cursor-not-allowed"}`}
          onClick={() => resendEmailMutation.mutate()}
          disabled={resendEmailMutation.isPending}
        >
          {resendEmailMutation.isPending ? "Please wait" : "Resend"}
          {resendEmailMutation.isPending && (
            <LoaderCircle className="animate-spin" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Confirm;
