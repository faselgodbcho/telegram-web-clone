import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/config/firebase.config";

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

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unSubscribe();
  }, []);

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.error(e);
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
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
