import { access_token_key, refresh_token_key } from 'api/apiConstants';
import { TokenPair } from 'api/apiModels';
export const getTokens = (): TokenPair => {
  const access_token = sessionStorage.getItem(access_token_key) || '';
  const refresh_token = sessionStorage.getItem(refresh_token_key) || '';
  return { access_token, refresh_token };
};

export const setTokens = (access_token: string, refresh_token: string) => {
  sessionStorage.setItem(access_token_key, access_token);
  sessionStorage.setItem(refresh_token_key, refresh_token);
};

export const clearTokens = () => {
  sessionStorage.clear();
};
