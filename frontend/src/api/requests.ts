import { baseUrl } from "api/apiConstants";
import { HTTPErrorPayload, UserPayload, TokenPair, PartialMember, User } from "api/apiModels";
import { getTokens, setTokens } from "api/token";
import { renewToken } from "./auth";

class HttpError extends Error {
  readonly statusCode: number;
  readonly message: string;

  constructor(error: HTTPErrorPayload) {
    super(error.statusText);
    this.statusCode = error.status;
    this.message = error.message;
  }
}

export const get = async <T>(url: string, auth = false) => {
  const request = new Request(baseUrl + url);
  if (auth) {
    return authFetch<T>(request);
  }
  return fetch(request).then((res) => handleResponse<T>(res));
};

export const post = async <T>(url: string, data: any, auth = false) => {
  const request = new Request(baseUrl + url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (auth) {
    return authFetch<T>(request);
  }
  return fetch(request).then((res) => handleResponse<T>(res));
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const { status, statusText } = response;
    const message = await response.json();
    throw new HttpError({status, statusText, message });
  }

  // Handle no response bodies.
  if (!response.headers.get("content-length")) {
    return {} as Promise<T>;
  }

  return response.json() as Promise<T>;
}

const authFetch = <T>(request: Request) => {
  const { access_token } = getTokens();
  request.headers.set("Authorization", `Bearer ${access_token}`);
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
  const { refresh_token } = getTokens();
  try {
    const tokens = await renewToken(refresh_token);
    setTokens(tokens.access_token, tokens.refresh_token);
    request.headers.set("Authorization", `Bearer ${tokens.access_token}`);
    return fetch(request).then((res) => handleResponse<T>(res));
  } catch (error) {
    throw error;
  }
};

export const get_user_with_token = async (): Promise<PartialMember> =>
  get<PartialMember>("user/", true);

export const registerUser = async (user: UserPayload): Promise<User> =>
  post<User>("user/", user);