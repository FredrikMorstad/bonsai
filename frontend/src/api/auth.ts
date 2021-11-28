import { post, get_user_with_token } from "./requests";
import { setTokens, getTokens } from "./token";
import { TokenPair } from "./apiModels";

export const verifyAuthentication = async () => {
  const tokens = getTokens();
  if (!tokens.access_token.length || !tokens.refresh_token.length) {
    return false;
  }
  try {
    await get_user_with_token();
    return true;
  } catch {
    return false;
  }
};

export const login = async (email: string, password: string) => {
  const tokens = await post<TokenPair>("auth/login", { email, password });
  setTokens(tokens.access_token, tokens.refresh_token);
};

export const renewToken = (refresh_token: string): Promise<TokenPair> =>
  post<TokenPair>("auth/renew", { refreshToken: refresh_token });
