import axios from "axios";
import { Memo } from "../types/typesFrontend";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Tallentaa muistelmat Session Storageen.
export const saveMemosToSessionStorage = (memos: Memo[]): void => {
  sessionStorage.setItem("memos", JSON.stringify(memos));
};

export const updateMemosInSessionStorage = (updatedMemo: Memo): void => {
  const memos = getMemosFromSessionStorage(); // Hae nykyiset muistilaput
  const clonedMemos = [...memos]; // Kloonaa muistilista

  const memoIndex = clonedMemos.findIndex((memo) => memo.id === updatedMemo.id); // Etsi päivitettävän muistilapun indeksi

  if (memoIndex !== -1) {
    clonedMemos[memoIndex] = updatedMemo; // Korvaa vanha muistilappu uudella, jos löytyy
  } else {
    clonedMemos.push(updatedMemo); // Muuten lisää uusi muistilappu listaan
  }

  sessionStorage.setItem("memos", JSON.stringify(clonedMemos)); // Tallenna päivitetyt muistilaput Session Storageen
};

// Hakee muistelmat Session Storagesta.
export const getMemosFromSessionStorage = (): Memo[] => {
  const memosJSON = sessionStorage.getItem("memos");
  return memosJSON ? JSON.parse(memosJSON) : [];
};

export const saveMemosToBackend = async (
  idToken: string | null,
  notes: Memo[]
): Promise<void> => {
  try {
    console.log("api notes: ", notes);
    /*
      await axios.post(`${API_BASE_URL}/save-memo`, {
        notes: notes,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });*/

    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/save-memo`,
      notes,
      config
    );
    console.log("response: ", response);
  } catch (error) {
    console.error("error tapahtui");
  }
};

export const getMemos = async (idToken: string | null): Promise<Memo[]> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };
	console.log("kutsutaan get-memos")
    const { data } = await axios.get<Memo[]>(`${API_BASE_URL}/get-memos`, config);
	console.log("memos: ", data)
    return data;
  } catch (error) {
    console.error("getMemos, tapahtui error");
  }
  return [];
};
