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

export type TokenContextType = {
  isLoggedIn: boolean;
  idToken: string | null;
  signOutMethod: () => void;
  setIdToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export interface DecodedToken {
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
}

export type RecomMenuItemType = {
  [key: string]: number;
};

export type RecommendationsType = {
  id: number;
  mealType: string;
  title: string;
  menuItems: RecomMenuItemType;
};
