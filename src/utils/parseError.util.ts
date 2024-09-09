import { FirebaseError } from "@firebase/util";
import { AxiosError } from "axios";
import { firebaseAuthErrors } from "./firebaseAuthErrors.util";

export const parseError = (err: unknown): string => {
  if (err instanceof FirebaseError) {
    const errorCode = err.code.split("/")[1];
    const message = firebaseAuthErrors[errorCode];

    return message;
  }

  if (err instanceof AxiosError) {
    if (err.response) return err.response.data.message;
    if (err.request) return "Something went wrong!";

    return err.message;
  }

  if (err instanceof Error) return err.message;
  if (typeof err === "string" || typeof err === "number" || typeof err === "boolean") return String(err);
  if (
    err &&
    typeof err === "object" &&
    "message" in err &&
    (typeof err.message === "string" || typeof err.message === "number" || typeof err.message === "boolean")
  )
    return String(err.message);

  return "Something went wrong!";
};
