// BACKEND TYPE INTERFACES

export interface RegisterData {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
  token: {
    id: string;
    error?: undefined;
  };
}

// Admin page data adding feature:
export interface FrontendRecommData {
  category: string;
  typeSelect?: string;
  title: string;
  name: string; // <- This will be saved in a list
  ageLimit?: number;
  textContent: string;
  photoLink?: string;
}

export interface recomm {
  [key: string]: number; // Name: ageLimit / activity: ageLimit
}
export interface TextContents {
  [key: string]: string; // <-- Key arvo on name tässä!
}

export interface Photos {
  [key: string]: string | undefined; // Photo link or filename -> title: string
}

export interface FinalRecommData {
  category: string;
  type?: string;
  title: string;
  recomm: recomm;
  textContent: TextContents;
  photos?: Photos;
  nameKeys: string[];
}

// Memo-related types

export interface Memo {
	type: string;
	content: string;
	id: string;
  }

export interface UserRecordList {
  users: UserRecord[];
  pageToken: string;
}

export type UserForDeletion = {
  uid: string;
  email: string;
};

export interface UserRecord extends UserForDeletion {
  emailVerified: boolean;
  metadata: { creationTime: string; lastSignInTime: string };
}

export interface UnverifiedUser extends UserForDeletion {
  creation_time: string;
  last_signin_time: string;
  verified: boolean;
}
