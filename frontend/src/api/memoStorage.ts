import { Memo } from "../types/typesFrontend";

//Tallentaa muistelmat Session Storageen.
export const saveMemosToSessionStorage = (memos: Memo[]): void => {
  sessionStorage.setItem('memos', JSON.stringify(memos));
};

export const updateMemosInSessionStorage = (updatedMemo: Memo): void => {
  const memos = getMemosFromSessionStorage(); // Hae nykyiset muistilaput
  const clonedMemos = [...memos]; // Kloonaa muistilista

  const memoIndex = clonedMemos.findIndex(memo => memo.id === updatedMemo.id); // Etsi päivitettävän muistilapun indeksi
  
  if (memoIndex !== -1) {
    clonedMemos[memoIndex] = updatedMemo; // Korvaa vanha muistilappu uudella, jos löytyy
  } else {
    clonedMemos.push(updatedMemo); // Muuten lisää uusi muistilappu listaan
  }

  sessionStorage.setItem('memos', JSON.stringify(clonedMemos)); // Tallenna päivitetyt muistilaput Session Storageen
};

// Hakee muistelmat Session Storagesta.
export const getMemosFromSessionStorage = (): Memo[] => {
  const memosJSON = sessionStorage.getItem('memos');
  return memosJSON ? JSON.parse(memosJSON) : [];
};