import { createContext, useState, useEffect } from "react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { useToast } from "@/hooks/use-toast";

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const initAuthContext: AuthContextType = {
  user: null,
  login: async () => {},
  logout: async () => {},
  signUp: async () => {},
};

const AuthContext = createContext<AuthContextType>(initAuthContext);

type Children = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: Children): React.ReactNode => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unSubscribe();
  }, []);

  const handleAuthError = (e: unknown) => {
    if (!(e instanceof Error) || !("code" in e)) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
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
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
