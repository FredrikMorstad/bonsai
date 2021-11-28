
export interface HTTPErrorPayload {
  status: number;
  statusText: string;
  message: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export interface PartialMember {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
