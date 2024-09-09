const TG_API_URL = "https://api.telegram.org/bot";

export const getTGConfig = (accessToken: string) => `${TG_API_URL}${accessToken}`;
export const tgRoutes = {
  getBotUsername: "/getMe",
  deployMiniGame: "/setChatMenuButton",
} as const;
