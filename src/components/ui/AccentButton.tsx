import React from "react";
import AccentButtonStyles from "@/styles/components/accentButton.module.css";
import { Link } from "react-router-dom";
import { AccentButtonProps } from "@/types";

export const AccentButton: React.FunctionComponent<AccentButtonProps> = ({
  children,
  icon: Icon,
  className,
  iconStyleClassName,
  ...restProps
}): JSX.Element => {
  if (restProps.as === "link") {
    return (
      <Link {...restProps} className={`${className ?? ""} ${AccentButtonStyles.accentButton}`}>
        <Icon className={`${iconStyleClassName ?? ""}`} />
        {children}
      </Link>
    );
  }

  return (
    <button {...restProps} className={`${className ?? ""} ${AccentButtonStyles.accentButton}`}>
      <Icon className={`${iconStyleClassName ?? ""}`} />
      {children}
    </button>
  );
};
