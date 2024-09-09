import React from "react";
import FormInputStyles from "@/styles/components/formInput.module.css";
import { FormInputProps } from "@/types";

export const FormInput: React.FunctionComponent<FormInputProps> = ({
  containerClassName,
  controlError,
  label,
  labelClassName,
  ...restProps
}) => {
  return (
    <div className={`${FormInputStyles.formControlGroup} ${containerClassName ?? ""}`}>
      <label className={`${FormInputStyles.formControlLabel} ${labelClassName ?? ""}`} htmlFor={restProps.id}>
        {label}
      </label>
      <input
        className={`${FormInputStyles.formControl} ${controlError ? FormInputStyles.formControlError : ""}`}
        {...restProps}
      />
      {controlError !== undefined && <p className={FormInputStyles.controlErrorMsg}>{controlError ?? ""}</p>}
    </div>
  );
};
