import React, { useEffect, useState } from "react";
import DeployMiniAppStyles from "@/styles/pages/deployMiniApp.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks";
import toast from "react-hot-toast";
import { DeployInputForm } from "@/types";
import { deployGame, getBotUsername, validateAccessTokenInput, validateWebURLInput } from "@/utils";
import { IoCheckmarkDone, IoRocketSharp } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { AccentButton, FormInput } from "@/components/ui";
import { LoadingSpinner } from "@/components/common";

export const DeployMiniApp: React.FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const { contextLoading, user } = useAuthContext();

  const [deployingMiniApp, setDeployingMiniApp] = useState<boolean>(false);
  const [accessTokenError, setAccessTokenError] = useState<string>("");
  const [webURLError, setWebURLError] = useState<string>("");
  const [miniAppURL, setMiniAppURL] = useState<string>("");
  const [miniAppURLCopied, setMiniAppURLCopied] = useState<boolean>(false);

  const copyMiniAppURLValue = () => {
    navigator.clipboard
      .writeText(miniAppURL)
      .then(() => {
        setMiniAppURLCopied(true);

        setTimeout(() => {
          setMiniAppURLCopied(false);
        }, 2500);
      })
      .catch((err) => console.error("Error in copyToClipboard(): ", err));
  };

  const handleFormSubmit = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (accessTokenError || webURLError) return;

    const deployInputForm = event.target as typeof event.target & DeployInputForm;
    const { accessToken, webURL, menuText } = deployInputForm;

    let formValidationErrors: boolean = false;

    if (!accessToken.value) {
      setAccessTokenError("Access token is required.");
      formValidationErrors = true;
    }

    if (!webURL.value) {
      setWebURLError("Web app URL required.");
      formValidationErrors = true;
    }

    if (formValidationErrors) return;

    setDeployingMiniApp(true);
    const botUsernameResponse = await getBotUsername(accessToken.value);

    if (!botUsernameResponse.success) {
      toast.error(botUsernameResponse.message);
      setDeployingMiniApp(false);
      return;
    }

    const deployGameResponse = await deployGame({
      accessToken: accessToken.value,
      menuButtonText: menuText.value || "PLAY",
      webAppURL: webURL.value,
    });

    if (!deployGameResponse.success) {
      toast.error(deployGameResponse.message);
      setDeployingMiniApp(false);
      return;
    }

    setMiniAppURL(`https://t.me/${botUsernameResponse.data.botUsername}`);
    deployInputForm.reset();
    setDeployingMiniApp(false);
  };

  useEffect(() => {
    if (contextLoading) return;

    if (!user) {
      toast.error("Please sign in to deploy your mini app.");
      navigate("/");
    }
  }, [contextLoading, user, navigate]);

  if (contextLoading || !user)
    return (
      <main className={DeployMiniAppStyles.deployPageMain}>
        <LoadingSpinner />
      </main>
    );

  return (
    <main className={DeployMiniAppStyles.deployPageMain}>
      {!miniAppURL && <h1 className={DeployMiniAppStyles.deployPageTitle}>Deploy Telegram Mini App</h1>}
      {miniAppURL && (
        <section className={DeployMiniAppStyles.deploySuccessSection}>
          <img src="/success.gif" alt="success" className={DeployMiniAppStyles.deploySuccessGIF} />
          <p className={DeployMiniAppStyles.deploySuccessMsg}>Your mini app has been successfully deployed!</p>
          <div className={DeployMiniAppStyles.deployURLContainer}>
            <p className={DeployMiniAppStyles.deployURLMsg}>
              You're all set! Visit{" "}
              <a href={miniAppURL} target="_blank" rel="noopener noreferrer" className={DeployMiniAppStyles.deployURL}>
                <code>{miniAppURL}</code>
              </a>{" "}
              to interact with your bot.
            </p>
            <p className={DeployMiniAppStyles.contentDivider}></p>
            <button className={DeployMiniAppStyles.urlCopyBtn} onClick={copyMiniAppURLValue}>
              {miniAppURLCopied ? <IoCheckmarkDone /> : <MdOutlineContentCopy />}
            </button>
          </div>
          <button className={DeployMiniAppStyles.deployResetBtn} onClick={() => setMiniAppURL("")}>
            Deploy another mini app
          </button>
        </section>
      )}
      {!miniAppURL && (
        <form autoComplete="off" noValidate className={DeployMiniAppStyles.deployForm} onSubmit={handleFormSubmit}>
          <FormInput
            label="Enter Access Token"
            id="accessTokenInput"
            name="accessToken"
            type="text"
            onInput={(event) => validateAccessTokenInput((event.target as HTMLInputElement).value, setAccessTokenError)}
            placeholder="Eg. - 7532291386:AAE1h4w6kRPJV_wUkuVlkd5XEC1aNobdx548"
            required
            readOnly={contextLoading || deployingMiniApp}
            controlError={accessTokenError}
          />
          <FormInput
            label="Enter Web App URL"
            id="webURLInput"
            name="webURL"
            type="url"
            onInput={(event) => validateWebURLInput((event.target as HTMLInputElement).value, setWebURLError)}
            placeholder="Eg. - https://lync.world/"
            required
            readOnly={contextLoading || deployingMiniApp}
            controlError={webURLError}
          />
          <FormInput
            label="Enter Menu Button Text"
            id="menuTextInput"
            name="menuText"
            type="text"
            placeholder="Eg. - PLAY"
            readOnly={contextLoading || deployingMiniApp}
          />
          <AccentButton
            disabled={deployingMiniApp}
            type="submit"
            icon={IoRocketSharp}
            iconStyleClassName={DeployMiniAppStyles.deployIcon}
            className={DeployMiniAppStyles.deployBtn}
          >
            {deployingMiniApp ? "Please Wait..." : "Deploy Mini App"}
          </AccentButton>
        </form>
      )}
    </main>
  );
};
