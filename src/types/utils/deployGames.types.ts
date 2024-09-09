export type DeployGameOptions = {
  accessToken: string;
  menuButtonText: string;
  webAppURL: string;
};

export type GetUsernameSuccessData = {
  botUsername: string;
};

export type GetUsernameAxiosResponse = {
  result: { username: string };
};
