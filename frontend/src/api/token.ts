import { accessTokenKey, refreshTokenKey } from 'api/apiConstants'
import { TokenPair } from 'api/apiModels';

export const getTokens = (): TokenPair => {
  const accessToken = sessionStorage.getItem(accessTokenKey) || '';
  const refreshToken = sessionStorage.getItem(refreshTokenKey) || '';
  return { accessToken, refreshToken };
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  sessionStorage.setItem(accessTokenKey, accessToken);
  sessionStorage.setItem(refreshTokenKey, refreshToken);
};
