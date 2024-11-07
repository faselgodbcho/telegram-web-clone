import { createContext, useState, useEffect } from "react";
import {
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
import { AuthContextType, Children } from "@/types";
import authErrorHandler from "@/utils/authErrorHandler";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      authErrorHandler(e, showToast);
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
      authErrorHandler(e, showToast);
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
