import { baseUrl } from "api/apiConstants";
import { HTTPErrorPayload } from "api/apiModels";
import { getTokens } from "api/token";

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


