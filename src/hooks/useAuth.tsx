import { useContext } from "react";
import AuthContext from "@/contexts/AuthProvider";
import { AuthContextType } from "@/contexts/AuthProvider";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be used within an auth provider.");

  return context;
};

export default useAuth;
