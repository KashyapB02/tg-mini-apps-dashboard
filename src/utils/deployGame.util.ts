import axios from "axios";
import { parseError } from ".";
import { DeployGameOptions, FunctionReturn, GetUsernameAxiosResponse, GetUsernameSuccessData } from "@/types";
import { getTGConfig, tgRoutes } from "@/configs";

export const getBotUsername = async (accessToken: string): Promise<FunctionReturn<GetUsernameSuccessData>> => {
  try {
    const tgConfig = getTGConfig(accessToken);
    const getURL = new URL(tgConfig + tgRoutes.getBotUsername);

    const { data } = await axios.get<GetUsernameAxiosResponse>(getURL.toString());
    const username = data.result.username;

    return { success: true, message: "Bot username fetched successfully", data: { botUsername: username } };
  } catch (error: unknown) {
    console.error("Error getting bot username: ", { error });
    const errorMsg = parseError(error);

    return { success: false, error, message: errorMsg };
  }
};

export const deployGame = async (options: DeployGameOptions): Promise<FunctionReturn> => {
  const { accessToken, menuButtonText, webAppURL } = options;

  const tgConfig = getTGConfig(accessToken);
  const deployURL = new URL(tgConfig + tgRoutes.deployMiniGame);

  const deployDataOptions = {
    menu_button: {
      type: "web_app",
      text: menuButtonText,
      web_app: {
        url: webAppURL,
      },
    },
  } as const;

  try {
    const { data } = await axios.post<unknown>(deployURL.toString(), deployDataOptions);
    console.info("Deploy game response: ", { data });

    return { success: true, message: "Game deployed successfully", data };
  } catch (error: unknown) {
    console.error("Error deploying game: ", { error });
    const errorMsg = parseError(error);

    return { success: false, error, message: errorMsg };
  }
};
