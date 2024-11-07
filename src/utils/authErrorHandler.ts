import { AuthErrorCodes } from "firebase/auth";
import useCustomToaster from "@/hooks/useCustomToaster";

const authErrorHandler = (e: unknown) => {
  const { showToast } = useCustomToaster();

  if (!(e instanceof Error) || !("code" in e)) {
    showToast("Error", "An error occurred. Please try again.");
    return;
  }

  switch (e.code) {
    case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
      showToast("Error", "Incorrect email or password. Please try again.");
      break;
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      showToast("Error", "Too many attempts. Please wait before trying again.");
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      showToast("Error", "Invalid email address format.");
      break;
    case AuthErrorCodes.USER_DELETED:
      showToast("Error", "No account found with this Email. Try signing up.");
      break;
    case AuthErrorCodes.EMAIL_EXISTS:
      showToast("Error", "This email is already in use. Try logging in.");
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      showToast("Error", "Password is too weak. Please choose a stronger one.");
      break;
    case AuthErrorCodes.INVALID_PASSWORD:
      showToast("Error", "Incorrect password. Please try again.");
      break;
    case AuthErrorCodes.NETWORK_REQUEST_FAILED:
      showToast(
        "Network Error",

        "A network error occurred. Please check your internet connection."
      );
      break;
    default:
      showToast("Error", "An error occurred. Please try again later." + e.code);
  }
};

export default authErrorHandler;
