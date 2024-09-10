import React, { useMemo, useState } from "react";
import HeaderBarStyles from "@/styles/components/headerBar.module.css";
import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AccentButton } from "../ui";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import toast from "react-hot-toast";
import { useLyncAuthProvider } from "@lyncworld/movement-social-login-sdk";
import { ProfileDropdown } from "./ProfileDropdown";
import { useOutsideClick } from "@/hooks";

export const HeaderBar: React.FunctionComponent = (): JSX.Element => {
  const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);
  const [walletAddressCopied, setWalletAddressCopied] = useState<boolean>(false);

  const { isSigningIn, signInWithGoogle, user } = useLyncAuthProvider();

  useMemo(() => {
    if (!user) setShowProfileDropdown(false);
  }, [user]);

  const dropdownRef = useOutsideClick<HTMLButtonElement, void>(() => setShowProfileDropdown(false));

  const collapseAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)} ... ${address.slice(-4)}`;
  };

  const copyWalletAddress = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setWalletAddressCopied(true);

        setTimeout(() => {
          setWalletAddressCopied(false);
        }, 2500);
      })
      .catch((err) => console.error("Error in copyToClipboard(): ", err));
  };

  const handleSignIn = async () => {
    const response = await signInWithGoogle();

    const toastFn = response.success ? toast.success : toast.error;
    toastFn(response.message);

    if (!response.success && response.error) {
      console.error("Error in signing in: ", { error: response.error });
    }
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

      {user && (
        <div className={HeaderBarStyles.userAvatar}>
          <AccentButton
            icon={walletAddressCopied ? IoCheckmarkDone : MdOutlineContentCopy}
            iconStyleClassName={HeaderBarStyles.copyIcon}
            className={HeaderBarStyles.copyAddressBtn}
            onClick={() => copyWalletAddress(user.walletAddress)}
            disabled={isSigningIn}
          >
            {collapseAddress(user.walletAddress)}
          </AccentButton>
          <button
            ref={dropdownRef}
            onClick={() => setShowProfileDropdown((current) => !current)}
            className={HeaderBarStyles.profileDropdownBtn}
            disabled={isSigningIn}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className={HeaderBarStyles.avatarImg}
              onError={(event) => {
                event.currentTarget.src = "/user-icon.webp";
              }}
            />
            {showProfileDropdown && (
              <div className={HeaderBarStyles.profileDropdown}>
                <ProfileDropdown />
              </div>
            )}
          </button>
        </div>
      )}
      {!user && (
        <AccentButton
          icon={AiFillGoogleCircle}
          iconStyleClassName={HeaderBarStyles.googleIcon}
          disabled={isSigningIn || user}
          onClick={handleSignIn}
        >
          Sign in with Google
        </AccentButton>
      )}
    </header>
  );
};
