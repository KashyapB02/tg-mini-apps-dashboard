import React from "react";
import { LinkProps } from "react-router-dom";
import { ChildrenProp } from "@/types";
import { IconType } from "react-icons";

export type AccentButtonProps = ChildrenProp & {
  icon: IconType;
  iconStyleClassName?: string;
} & (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as?: "button";
      })
    | (LinkProps &
        React.RefAttributes<HTMLAnchorElement> & {
          as: "link";
        })
  );
