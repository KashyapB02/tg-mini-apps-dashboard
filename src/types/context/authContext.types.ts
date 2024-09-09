import { FirebaseUser } from "..";

export type AuthProviderValues = {
  contextLoading: boolean;
  user: FirebaseUser | null;
};
