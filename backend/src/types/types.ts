// BACKEND TYPE INTERFACES

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
  token: {
    id: string;
    error?: undefined;
  };
}

// Admin page data adding feature:
export interface FrontendDataObject {
  category: string;
  typeSelect?: string;
  title: string;
  content: string; // <- This will be saved in a list
  ageLimit?: number;
  photoLink?: string;
  photoFileName?: string;
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

export interface AddDataToDatabase {
  category: string;
  type?: string;
  title: string;
  content: contents | TipContents; // Adjusted to match the structure
  photos?: Photos; // Adjusted to match the structure
}

export interface UserData {}
