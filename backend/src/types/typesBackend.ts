// BACKEND TYPE INTERFACES

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  text: string; // Chattirobotti message content
  timestamp: Date; // Change the type to number
  isUser: boolean;
}

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
}

export interface UserData {}
