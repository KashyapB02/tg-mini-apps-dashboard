import React from "react";
import LoadingSpinnerStyles from "@/styles/components/loadingSpinner.module.css";

export const LoadingSpinner: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={LoadingSpinnerStyles.loadingSpinnerOverlay}>
      <img src="/loading.gif" alt="loading..." className={LoadingSpinnerStyles.loadingSpinnerGIF} />
    </div>
  );
};
