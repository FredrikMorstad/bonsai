
export interface HTTPErrorPayload {
  status: number;
  statusText: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
