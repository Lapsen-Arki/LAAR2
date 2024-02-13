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

// Admin page data adding feature:
// Category and typeSelect comes from separate useStates:
export interface FormDataToBackend {
  title: string;
  content: string; // <- This will be saved in a list in the backend
  ageLimit?: number;
  photoLink?: string;
  photoFileName?: string;
}
// -->
export interface FinalDataToBackend {
  category: string;
  typeSelect?: string;
  title: string;
  content: string; // <- This will be saved in a list in the backend
  ageLimit?: number;
  photoLink?: string;
  photoFileName?: string;
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

export interface contents {
  [key: string]: number; // Name: ageLimit / activity: ageLimit
}
export interface TipContents {
  [key: string]: string; // <-- Key arvo on title tässä!
}

export interface Photos {
  [key: string]: string; // Photo link or filename -> title: string
}

export type RecommendationsType = {
  category: string;
  type?: string;
  title: string;
  content: contents | TipContents;
  photos?: Photos;
};

export type TipsType = {
  id: number;
  adviseType: string;
  title: string;
  textContents: string;
  photo?: string;
};

export interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string;
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
