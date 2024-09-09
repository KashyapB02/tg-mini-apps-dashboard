import { OAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseAuth } from "@/configs";
import { parseError } from "@/utils";
import { FirebaseUser, FunctionReturn } from "@/types";

export const signInWithGoogle = async (): Promise<FunctionReturn<FirebaseUser>> => {
  const provider = new OAuthProvider("google.com");
  provider.addScope("profile");
  provider.addScope("email");

  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    const user = result.user;

    return {
      success: true,
      message: "User signed in successfully",
      data: user,
    };
  } catch (error: unknown) {
    console.error("Error in sign in with google: ", { error });
    const errorMsg = parseError(error);

    return { success: false, error, message: errorMsg };
  }
};

export const signOutFromGoogle = async (): Promise<FunctionReturn<undefined>> => {
  try {
    await signOut(firebaseAuth);

    return {
      success: true,
      message: "User signed out successfully",
      data: undefined,
    };
  } catch (error: unknown) {
    console.error("Error in sign out from google: ", { error });
    const errorMsg = parseError(error);

    return { success: false, error, message: errorMsg };
  }
};
