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

export type TokenContextType = {
  isLoggedIn: boolean;
  idToken: string | null;
  ready: boolean;
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
  displayName: string;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
}

export interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string;
  allergies?: string[]; // <-- this feature is coming later
}

export interface CarerProfile {
  receiverUid: string;
  email: string;
  name: string;
}
export interface NamesAndAgesType {
  childName: string;
  age: number;
}
