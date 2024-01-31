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

export interface AddDataToDatabase {
  category: string;
  choice: string;
  name: string;
  ageLimit: number;
  photoLink: string;
  photoFileName: string;
}

export interface UserData {}
