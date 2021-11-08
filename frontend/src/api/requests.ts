import { baseUrl } from "api/apiConstants";
import { HTTPErrorPayload, TokenPair } from "api/apiModels";
import { getTokens, setTokens } from "api/token";

class HttpError extends Error {
  readonly status: number;

  constructor(error: HTTPErrorPayload) {
    super(error.statusText);
    this.status = error.status;
  }
}

export const get = async <T>(url: string, auth = false) => {
  const request = new Request(baseUrl + url);
  if (auth) {
    return authFetch<T>(request);
  }
  return fetch(request).then((res) => handleResponse<T>(res));
};

export const post = async <T>(
  url: string,
  data: any,
  auth = false,
) => {
  const request = new Request(baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  if (auth) {
    return authFetch<T>(request);
  }
  return fetch(request).then((res) => handleResponse<T>(res));
};

function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const { status, statusText } = response;
    throw new HttpError({ status, statusText } as HTTPErrorPayload);
  }

  // Handle no response bodies.
  if (!response.headers.get("content-length")) {
    return {} as Promise<T>;
  }

  return response.json() as Promise<T>;
}

const authFetch = <T>(request: Request) => {
  const { accessToken } = getTokens();
  request.headers.set("Authorization", `Bearer ${accessToken}`);
  return fetch(request).then((res) => {
    try {
      return handleResponse<T>(res);
    } catch (error) {
      if (error.statusCode === 401) {
        return renewAndRetry<T>(request);
      } else {
        throw error;
      }
    }
  });
};

const renewAndRetry = async <T>(request: Request): Promise<T> => {
  const { refreshToken } = getTokens();
  try {
    const tokens = await renewToken(refreshToken);
    setTokens(tokens.accessToken, tokens.refreshToken);
    request.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
    return fetch(request).then((res) => handleResponse<T>(res));
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  const tokens = await post<TokenPair>('auth/login', { email, password });
  console.log(tokens);
  setTokens(tokens.accessToken, tokens.refreshToken)
}

export const renewToken = (refreshToken: string): Promise<TokenPair> =>
  post<TokenPair>('auth/renew', { refreshToken: refreshToken });

