import { Token } from "@stripe/stripe-js";

// FRONTEND TYPE INTERFACES

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

export interface AddDataToDatabase {
  choice: string;
  name: string;
  ageLimit: number;
  photoLink: string;
  photoFileName: string;
}
