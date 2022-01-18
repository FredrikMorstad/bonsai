export interface HTTPErrorPayload {
  status: number;
  statusText: string;
  message: string;
}
export interface User {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  mobile_number?: number;
}
export interface UserPayload extends User {
  password_validation: string;
}
export interface PlantPayload {
  name: string;
  species?: string;
  temperature_min?: number;
  temperature_max?: number;
  humidity_min?: number;
  humidity_max?: number;
  soil_moisture_min?: number;
  soil_moisture_max?: number;
  region?: string;
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
