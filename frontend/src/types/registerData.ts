import { Token } from "@stripe/stripe-js";

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
  result?: {
    token: Token;
    error: undefined;
  };
}
