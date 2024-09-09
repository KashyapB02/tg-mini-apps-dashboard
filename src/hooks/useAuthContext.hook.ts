import { useContext } from "react";
import { AuthContext } from "@/context";
import { AuthProviderValues } from "@/types";

export const useAuthContext = (): AuthProviderValues => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
