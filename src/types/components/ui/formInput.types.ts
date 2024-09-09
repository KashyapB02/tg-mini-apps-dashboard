import React from "react";

export type FormInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
  containerClassName?: string;
  controlError?: string;
  label: string;
  labelClassName?: string;
};
