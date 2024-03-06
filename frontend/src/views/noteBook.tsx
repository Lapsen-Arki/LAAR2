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
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
          variant="h6"
          component="h6"
          sx={{textAlign: 'center'}}
        >
          Lisää väliaikainen muistilappu
        </Typography>

        <Tooltip title="Lisää muistelmia">
          <Button
            sx={{ marginTop: 2, marginBottom: 2 }}
            type="submit"
            variant="outlined"
            onClick={handleToggle}
          >
            <AddIcon />
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        </Tooltip>

        <Collapse in={isOpen}>
          <MemoCreator addMemo={addMemo} />
        </Collapse>
        <ReturnBtn />
      </Container>
    
      <Container component="main" maxWidth="sm" style={{ textAlign: "center", boxShadow: 'unset' }}>
        {memos.map((memo, index) => (
            <NotePage key={index} memo={memo} />
            ))}
      </Container>
    </ThemeProvider>
  );
};

export default NoteBook;