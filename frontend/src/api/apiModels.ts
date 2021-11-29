
export interface HTTPErrorPayload {
  status: number;
  statusText: string;
  message: string;
}
export interface User{
  username: string,
  email: string,
  password: string,
  first_name?: string,
  last_name?: string,
  date_of_birth?: string,
  mobile_number?: number,
}
export interface UserPayload extends User{
  password_validation: string
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
