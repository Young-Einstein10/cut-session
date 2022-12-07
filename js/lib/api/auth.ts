import { AxiosInstance, AxiosResponse } from "axios";

export type AccessType = "USER" | "MERCHANT";

export interface LoginPayload {
  username: string;
  password: string;
  accessType: AccessType;
}

export interface RegisterUserPayload {
  name: string;
  dob: string;
  email: string;
  cityOfResidence: string;
  username: string;
  password: string;
  phoneNumber: string;
}

export type RegisterMerchantPayload = Omit<
  RegisterUserPayload,
  "cityOfResidence" | "dob"
> & {
  cityOfOperation: string;
};

export type UserProps = {
  merchantId?: string;
  userId?: string;
  name: string;
  email: string;
  cityOfOperation: string;
  phoneNumber: string;
};

export interface IClientProps {
  count: number;
  next: string;
  previous: string;
  data: UserProps[];
}

class Auth {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  login(userDetails: LoginPayload) {
    return this.client.post<{ token: string }>("/sign-in", userDetails);
  }

  registerMerchant(body: RegisterMerchantPayload) {
    return this.client.post<{ merchantId: string }>(
      "/register/merchants",
      body
    );
  }

  registerUser(body: RegisterUserPayload) {
    return this.client.post<{ userId: string }>("/register/users", body);
  }

  fetchUsers(limit = 20, offset = 1) {
    return this.client.get<IClientProps>(
      `/clients?type=USER&limit=${limit}&offset=${offset}`
    );
  }

  fetchMerchants(limit = 20, offset = 1) {
    return this.client.get<IClientProps>(
      `/clients?type=MERCHANT&limit=${limit}&offset=${offset}`
    );
  }

  searchStudiosByName(name: string) {
    return this.client.get<IClientProps>(`/clients?type=MERCHANT&name=${name}`);
  }

  searchStudiosByCity(city: string) {
    return this.client.get<IClientProps>(`/clients?type=MERCHANT&city=${city}`);
  }
}

export default Auth;
