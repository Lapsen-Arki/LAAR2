import React, { useState, useEffect } from 'react';
import NotePage from '../components/notebook/notePage';
import MemoCreator from '../components/notebook/memoCreator';
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from '../styles/formThemeMUI';
import ReturnBtn from '../components/returnBtn';
import { Memo } from '../types/typesFrontend';
import { saveMemosToSessionStorage, getMemosFromSessionStorage } from '../api/memoStorage';
import {
    Container,
    Typography,
    Collapse,
    Tooltip,
    Button,
} from "@mui/material";

const NoteBook: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Tila muistelmien lisäämisnäkymän hallintaan

  useEffect(() => {
    // Ladataan muistelmat Session Storagesta kun komponentti ladataan ensimmäistä kertaa
    const storedMemos = getMemosFromSessionStorage();
    if(storedMemos) setMemos(storedMemos); // Varmista, että storedMemos on olemassa ennen kuin kutsut setMemos
  }, []);

  const addMemo = (newMemo: Memo) => {
    const updatedMemos = [...memos, newMemo];
    setMemos(updatedMemos);
    // Tallennetaan päivitetyt muistelmat Session Storageen
    saveMemosToSessionStorage(updatedMemos);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={formTheme}>
    <Container component="main" maxWidth="sm" style={{ textAlign: "center" }}>
      <Typography 
        variant="h4"
        component="h1"
        gutterBottom
        sx={{textAlign: 'center'}}
      >
        Muistikirja
      </Typography>

      <Tooltip title="Lisää muistelmia">
        <Button
            sx={{ marginTop: 2, marginBottom: 2 }}
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleToggle}
          >
            Lisää muistelmia
        </Button>

      </Tooltip>

      <Collapse in={isOpen}>
        <MemoCreator addMemo={addMemo} />
        {memos.map((memo, index) => (
          <NotePage key={index} memo={memo} />
        ))}
      </Collapse>
      <ReturnBtn />
      </Container>
    </ThemeProvider>
  );
};

export default NoteBook;