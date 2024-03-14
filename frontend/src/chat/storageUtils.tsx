// storageUtils.tsx
import { Message } from "../types/typesFrontend";

// This file contains functions for saving and loading data from local storage and session storage.
/*
export const saveToSessionStorage = (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };
  
export const loadFromSessionStorage = (key: string) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };
*/

export const saveToSessionStorage = (key: string, data: Message | Message[]) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };
  
  // Lataa Message tai Message[] sessionStoragesta
  export const loadFromSessionStorage = (key: string) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };