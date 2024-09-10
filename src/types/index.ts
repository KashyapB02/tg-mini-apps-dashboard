import React from "react";

export * from "./components";
export * from "./context";
export * from "./pages";
export * from "./utils";

export type ChildrenProp = {
  children: React.ReactNode;
};

export type FunctionSuccessReturn<TSuccessData = unknown> = {
  success: true;
  message: string;
  data: TSuccessData;
};

export type FunctionErrorReturn = {
  success: false;
  message: string;
  error: unknown;
};

export type FunctionReturn<TSuccessData = unknown> = FunctionSuccessReturn<TSuccessData> | FunctionErrorReturn;
