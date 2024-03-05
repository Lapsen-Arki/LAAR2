export interface ChildProfile {
  creatorId: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
}

export interface User {
  uid: string;
  email: string;
  password: string;
  name: string;
}

export interface CreateCustomer {
  email: string;
  source: string;
}

export interface CustomerData {
  id: string;
  subscriptionId?: string;
  // ... other properties related to a customer (e.g., email, source)
}

export interface CreateSubscription {
  customer: string;
  items: { plan: string }[];
  trial_period_days: number;
  cancel_at_period_end: boolean;
}
