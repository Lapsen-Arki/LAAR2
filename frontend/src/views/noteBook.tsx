import React, { useState, useEffect } from 'react';
import NotePage from '../components/notebook/notePage';
import MemoCreator from '../components/notebook/memoCreator';
import { Memo } from '../types/typesFrontend';
import { saveMemosToSessionStorage, getMemosFromSessionStorage } from '../api/memoStorage';
import Typography from '@mui/material/Typography';

const NoteBook: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    // Ladataan muistelmat Session Storagesta kun komponentti ladataan ensimmäistä kertaa
    const storedMemos = getMemosFromSessionStorage();
    setMemos(storedMemos);
  }, []);

  const addMemo = (newMemo: Memo) => {
    const updatedMemos = [...memos, newMemo];
    setMemos(updatedMemos);
    // Tallennetaan päivitetyt muistelmat Session Storageen
    saveMemosToSessionStorage(updatedMemos);
  };

  return (
    <div>
      <Typography 
      variant="h4"
      component="h1"
      gutterBottom
      sx={{textAlign: 'center'}}
      >
        Muistikirja
    </Typography>
    
      <MemoCreator addMemo={addMemo} />
      {memos.map((memo, index) => (
        <NotePage key={index} memo={memo} />
      ))}
    </div>
  );
};

export default NoteBook;
