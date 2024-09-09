export type DeployInputForm = {
  accessToken: { value: string };
  webURL: { value: string };
  menuText: { value: string };
  reset: () => void;
};
