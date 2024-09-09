import React from "react";
import HomePageStyles from "@/styles/pages/homepage.module.css";
import { AccentButton } from "@/components/ui";
import { IoRocketSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks";
import toast from "react-hot-toast";

export const HomePage: React.FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const { contextLoading, user } = useAuthContext();

  const handleNavigate = () => {
    if (contextLoading) return;

    if (!user) {
      toast.error("Please sign in to deploy your mini app.");
      return;
    }

    navigate("/deploy-mini-app");
  };

  return (
    <main className={HomePageStyles.homepageMain}>
      <h1 className={HomePageStyles.homepageTitle}>
        Deploy <span className={HomePageStyles.accentText}>Telegram Mini Apps</span> Effortlessly
      </h1>
      <p className={HomePageStyles.descriptionText}>
        Effortlessly deploy and manage telegram mini apps with our no-code dashboard. Transform your telegram presence,
        simplify your business engagement with telegram mini apps and engage your audience directly within telegram's
        interface.
      </p>
      <AccentButton icon={IoRocketSharp} iconStyleClassName={HomePageStyles.deployIcon} onClick={handleNavigate}>
        Deploy Your Mini App
      </AccentButton>
    </main>
  );
};
