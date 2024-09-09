import React from "react";
import PageNotFoundStyles from "@/styles/pages/pageNotFound.module.css";
import { AccentButton } from "@/components/ui";
import { IoMdHome } from "react-icons/io";

export const PageNotFound: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={PageNotFoundStyles.pageNotFoundMain}>
      <h1 className={PageNotFoundStyles.pageTitle}>4 0 4</h1>
      <h2 className={PageNotFoundStyles.pageSubtext}>Page Not Found</h2>
      <p className={PageNotFoundStyles.pageMsg}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        Please check the URL and try again.
        <br />
        If you think this is an error, please contact the website administrator.
      </p>
      <AccentButton as="link" to="/" icon={IoMdHome} iconStyleClassName={PageNotFoundStyles.homeIcon}>
        Go back to Home
      </AccentButton>
    </div>
  );
};
