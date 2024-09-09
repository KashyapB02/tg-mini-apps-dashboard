import React, { useState } from "react";
import HeaderBarStyles from "@/styles/components/headerBar.module.css";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AccentButton } from "../ui";
import { signInWithGoogle, signOutFromGoogle } from "@/services";
import toast from "react-hot-toast";
import { useAuthContext } from "@/hooks";
import { MdOutlineLogout } from "react-icons/md";

export const HeaderBar: React.FunctionComponent = (): JSX.Element => {
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const { contextLoading, user } = useAuthContext();

  const handleSignInWithGoogle = async () => {
    setSigningIn(true);
    const signInResult = await signInWithGoogle();

    const toastMessage = signInResult.success ? toast.success : toast.error;
    toastMessage(signInResult.message);
    setSigningIn(false);
  };

  const handleSingOutFromGoogle = async () => {
    const signInResult = await signOutFromGoogle();

    const toastMessage = signInResult.success ? toast.success : toast.error;
    toastMessage(signInResult.message);
  };

  return (
    <header className={HeaderBarStyles.appHeader}>
      <Link to="/" className={HeaderBarStyles.logo}>
        <img
          src="/lync-branding.webp"
          alt="Lync"
          className={`${HeaderBarStyles.logoImg} ${HeaderBarStyles.withText}`}
        />
        <img src="/lync.webp" alt="Lync" className={`${HeaderBarStyles.logoImg} ${HeaderBarStyles.logoOnly}`} />
      </Link>
      {!contextLoading && (
        <React.Fragment>
          {user && (
            <div className={HeaderBarStyles.userAvatar}>
              <img
                src={user.providerData[0].photoURL ?? "/user-icon.webp"}
                alt={user.providerData[0].displayName ?? "Avatar"}
                className={HeaderBarStyles.avatarImg}
                onError={(event) => {
                  event.currentTarget.src = "/user-icon.webp";
                }}
              />
              <AccentButton
                icon={MdOutlineLogout}
                iconStyleClassName={HeaderBarStyles.logoutIcon}
                className={HeaderBarStyles.logoutBtn}
                onClick={handleSingOutFromGoogle}
              >
                {null}
              </AccentButton>
            </div>
          )}
          {!user && (
            <AccentButton
              icon={AiFillGoogleCircle}
              iconStyleClassName={HeaderBarStyles.googleIcon}
              disabled={contextLoading || signingIn}
              onClick={handleSignInWithGoogle}
            >
              Sign in with Google
            </AccentButton>
          )}
        </React.Fragment>
      )}
    </header>
  );
};
