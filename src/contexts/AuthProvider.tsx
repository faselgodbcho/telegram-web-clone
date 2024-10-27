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
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthLoading(false);
    });

    return () => unSubscribe();
  }, [auth]);

  const handleAuthError = (e: unknown) => {
    if (!(e instanceof Error) || !("code" in e)) {
      toast({
        title: "Error",
        description: "Incorrect email or password. Please try again.",
        variant: "destructive",
        className:
          "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg",
      });

      return;
    }

    switch (e.code) {
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        toast({
          title: "Error",
          description: "Incorrect email or password. Please try again.",
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg",
        });
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        toast({
          title: "Error",
          description: "Too many attempts. Please wait before trying again.",
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg",
        });
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        toast({
          title: "Error",
          description: "Invalid email address format.",
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg",
        });
        break;
      case AuthErrorCodes.USER_DELETED:
        toast({
          title: "Error",
          description: "No account found with this Email. Try signing up.",
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 text-white font-medium rounded-lg p-4 shadow-lg",
        });
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        toast({
          title: "Error",
          description: "This email is already in use. Try logging in.",
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 text-white font-medium rounded-lg p-4 shadow-lg",
        });
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        toast({
          title: "Error",
          description: "Password is too weak. Please choose a stronger one.",
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 text-white font-medium rounded-lg p-4 shadow-lg",
        });
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
        toast({
          title: "Error",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 text-white font-medium rounded-lg p-4 shadow-lg",
        });
        break;
      case AuthErrorCodes.NETWORK_REQUEST_FAILED:
        toast({
          title: "Network Error",
          description:
            "A network error occurred. Please check your internet connection.",
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 text-white font-medium rounded-lg p-4 shadow-lg",
        });
        break;
      default:
        toast({
          title: "Error",
          description: "An error occurred. Please try again later." + e.code,
          variant: "destructive",
          className:
            "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 text-white font-medium rounded-lg p-4 shadow-lg",
        });
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
      toast({
        title: "Error",
        description: "Failed to logout. Please try again later.",
      });
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
