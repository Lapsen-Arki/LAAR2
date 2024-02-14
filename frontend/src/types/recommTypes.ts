// Admin page data adding feature:
export interface FormDataToBackend {
  title: string;
  name: string; // <- This will be saved in a object in the backend
  textContent: string;
  ageLimit?: number;
  photoLink?: string;
}
// --> Category and typeSelect comes from separate useStates: -->
export interface FinalDataToBackend extends FormDataToBackend {
  category: string;
  typeSelect?: string;
}

export interface recomm {
  [key: string]: number; // Name: ageLimit / activity: ageLimit
}
export interface TipContents {
  [key: string]: string; // <-- Key arvo on title tässä!
}

export interface Photos {
  [key: string]: string; // Photo link or filename -> title: string
}

// This is final recomm data type coming from backend:
export type RecommendationsType = {
  category: string;
  type?: string;
  title: string;
  recomm?: recomm | TipContents;
  textContent: TipContents;
  photos?: Photos;
};

export type TipsType = {
  id: number;
  adviseType: string;
  title: string;
  textContents: string;
  photo?: string;
};
