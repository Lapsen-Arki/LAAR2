import { Memo } from "../types/typesFrontend";

//Tallentaa muistelmat Session Storageen.
export const saveMemosToSessionStorage = (memos: Memo[]): void => {
  sessionStorage.setItem('memos', JSON.stringify(memos));
};

//Hakee muistelmat Session Storagesta.
export const getMemosFromSessionStorage = (): Memo[] => {
  const memosJSON = sessionStorage.getItem('memos');
  return memosJSON ? JSON.parse(memosJSON) : [];
};
