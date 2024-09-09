import React, { createContext, useEffect, useMemo, useState } from "react";
import { AuthProviderValues, ChildrenProp, FirebaseUser } from "@/types";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/configs";
import { parseError } from "@/utils";
import toast from "react-hot-toast";

export const AuthContext = createContext<AuthProviderValues | undefined>(undefined);

export const AuthProvider: React.FunctionComponent<ChildrenProp> = ({ children }): JSX.Element => {
  const [contextLoading, setContextLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(
      firebaseAuth,
      (user) => {
        setUser(user);
        setContextLoading(false);
      },
      (error: unknown) => {
        console.error("Error in onAuthStateChanged: ", { error });

        const errorMessage = parseError(error);
        toast.error(errorMessage);

        setContextLoading(false);
        setUser(null);
      }
    );
  }, []);

  const authProviderValues: AuthProviderValues = useMemo(
    () => ({
      contextLoading,
      user,
    }),
    [contextLoading, user]
  );

  return <AuthContext.Provider value={authProviderValues}>{children}</AuthContext.Provider>;
};
