const validAccessTokenRegex = new RegExp(/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/);
const validWebBaseURLRegex = new RegExp(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?\/?$/);

export const validateAccessTokenInput = (
  accessToken: string,
  setAccessTokenError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!accessToken) {
    setAccessTokenError("Access token is required.");
    return false;
  }

  if (!validAccessTokenRegex.test(accessToken)) {
    setAccessTokenError("Given access token is not valid.");
    return false;
  }

  setAccessTokenError("");
  return true;
};

export const validateWebURLInput = (webURL: string, setWebURLError: React.Dispatch<React.SetStateAction<string>>) => {
  if (!webURL) {
    setWebURLError("Web app URL is required.");
    return false;
  }

  if (!validWebBaseURLRegex.test(webURL)) {
    setWebURLError("Given web app URL is not valid.");
    return false;
  }

  setWebURLError("");
  return true;
};
