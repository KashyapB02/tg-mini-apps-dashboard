import React from "react";
import ProfileDropdownStyles from "@/styles/components/profileDropdown.module.css";
import { MdOutlineLogout } from "react-icons/md";
import { useLyncAuthProvider } from "@lyncworld/movement-social-login-sdk";
import toast from "react-hot-toast";

export const ProfileDropdown: React.FunctionComponent = (): JSX.Element => {
  const { isSigningIn, signOutFromGoogle, user } = useLyncAuthProvider();

  const stopPropagation = (event: React.MouseEvent<HTMLButtonElement | HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const handleSignOut = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    stopPropagation(event);
    const response = await signOutFromGoogle();

    const toastFn = response.success ? toast.success : toast.error;
    toastFn(response.message);

    if (!response.success && response.error) {
      console.error("Error in signing in: ", { error: response.error });
    }
  };

  if (!user) return <React.Fragment />;

  return (
    <ul className={ProfileDropdownStyles.dropdownList}>
      <li onClick={(event) => stopPropagation(event)} className={ProfileDropdownStyles.dropdownListItems}>
        {user.name}
      </li>
      <li onClick={(event) => stopPropagation(event)} className={ProfileDropdownStyles.dropdownListItems}>
        {user.email}
      </li>
      <li className={ProfileDropdownStyles.dropdownListItems}>
        <button className={ProfileDropdownStyles.logoutBtn} onClick={handleSignOut} disabled={isSigningIn}>
          Logout
          <MdOutlineLogout className={ProfileDropdownStyles.logoutIcon} />
        </button>
      </li>
    </ul>
  );
};
