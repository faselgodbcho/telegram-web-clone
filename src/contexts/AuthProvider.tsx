import { createContext, useState, useEffect } from "react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { useNavigate } from "react-router-dom";
import useCustomToaster from "@/hooks/useCustomToaster";

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthLoading: boolean;
};

const initAuthContext: AuthContextType = {
  user: null,
  login: async () => {},
  logout: async () => {},
  signUp: async () => {},
  isAuthLoading: false,
};

const AuthContext = createContext<AuthContextType>(initAuthContext);

type Children = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: Children): React.ReactNode => {
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const { showToast } = useCustomToaster();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthLoading(false);
    });

    return () => unSubscribe();
  }, [auth]);

  const handleAuthError = (e: unknown) => {
    if (!(e instanceof Error) || !("code" in e)) {
      showToast("Error", "Incorrect email or password. Please try again.");
      return;
    }

    switch (e.code) {
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        showToast("Error", "Incorrect email or password. Please try again.");
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        showToast(
          "Error",
          "Too many attempts. Please wait before trying again."
        );
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
        showToast(
          "Error",
          "Password is too weak. Please choose a stronger one."
        );
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
        showToast(
          "Error",
          "An error occurred. Please try again later." + e.code
        );
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        navigate("/confirm");
      }
    } catch (e) {
      console.error(e);
      handleAuthError(e);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        navigate("/confirm");
      }
    } catch (e) {
      console.error(e);
      handleAuthError(e);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
      showToast("Error", "Failed to logout. Please try again later.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, login, logout, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
