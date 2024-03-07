import React, { useState, useEffect } from 'react';
import NotePage from '../components/notebook/notePage';
import MemoCreator from '../components/notebook/memoCreator';
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from '../styles/formThemeMUI';
import ReturnBtn from '../components/returnBtn';
import { Memo } from '../types/typesFrontend';
import { saveMemosToSessionStorage, getMemosFromSessionStorage, updateMemosInSessionStorage } from '../api/memoStorage';
import {
    Container,
    Typography,
    Collapse,
    Tooltip,
    Button,
    Box,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';

const NoteBook: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Tila muistelmien lisäämisnäkymän hallintaan
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  useEffect(() => {
    // Ladataan muistelmat Session Storagesta kun komponentti ladataan ensimmäistä kertaa
    const storedMemos = getMemosFromSessionStorage();
    if(storedMemos) setMemos(storedMemos); // Varmista, että storedMemos on olemassa ennen kuin kutsut setMemos
  }, []);

  const addMemo = (newMemo: Memo) => {
    const updatedMemos = [...memos, { ...newMemo, id: Date.now().toString() }];
    setMemos(updatedMemos);
    saveMemosToSessionStorage(updatedMemos);
    updateMemosInSessionStorage(newMemo); // Lisää uusi muistilappu sessionStorageen
  };

  const handleDragStart = (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    
    // Luodaan kloonattu muistilista järjestyksen päivittämistä varten
    const newMemos = [...memos];
    
    // Etsitään vedetyn muistilapun indeksi
    const draggedIndex = newMemos.findIndex(memo => memo.id === draggedId);
    
    // Etsitään kohdemuistilapun indeksi
    const targetIndex = newMemos.findIndex(memo => memo.id === targetId);
  
    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Poistetaan vedetty muistilappu ja lisätään se kohdemuistilapun paikalle
      const [draggedMemo] = newMemos.splice(draggedIndex, 1);
      newMemos.splice(targetIndex, 0, draggedMemo);
  
      // Päivitetään tila uudella muistilistalla
      setMemos(newMemos);
  
      // Poistetaan vanhat muistilaput ja lisätään uudet oikeassa järjestyksessä Session Storageen
      saveMemosToSessionStorage(newMemos);
    }
  };
  

  const handleToggleAdd = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleInfo = () => {
    setIsOpenInfo(!isOpenInfo);
  };

  return (
    <ThemeProvider theme={formTheme}>

      {/* Lisää uusi muistilappu */}
      <Container className="noteBook" component="main" style={{ textAlign: "center" }}>
        <Typography 
          variant="h6"
          component="h6"
          sx={{textAlign: 'center'}}
        >
          Lisää väliaikainen muistilappu
        </Typography>

        <Tooltip title="Lisää muistelmia">
          <Button
            sx={{ marginTop: 2, marginBottom: 2, marginRight: 2 }}
            type="submit"
            variant="outlined"
            onClick={handleToggleAdd}
          >
            <AddIcon />
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        </Tooltip>

        <Tooltip title="Ominaisuus tulossa!">
          <Button
            sx={{ marginTop: 2, marginBottom: 2 }}
            type="submit"
            variant="outlined"
          >
            <SaveIcon />
          </Button>
        </Tooltip>

        <Collapse in={isOpen}>
          <MemoCreator addMemo={addMemo} />
        </Collapse>
          <ReturnBtn />
        
        <Tooltip title="INFO">
          <Button
            sx={{ marginTop: 2, marginBottom: 2, marginRight: 2 }}
            type="submit"
            variant="outlined"
            onClick={handleToggleInfo}
          >
            <InfoIcon />
            {isOpenInfo ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        </Tooltip>

        <Collapse in={isOpenInfo}>
        <Box sx={{backgroundColor: 'orange', padding: 3, borderRadius: 10, marginBottom: 2}}>
          <Typography variant="body1" gutterBottom><i>Voit halutessasi vaihtaa muistilappujen paikkaa raahaamalla,</i> tämä ominaisuus toimii vain PC:llä.</Typography>
        </Box>
        </Collapse>
          
      </Container>
      
      {/* Näytetään muistilaput */}
      <Container className="noteBook" component="main" maxWidth="sm" style={{ textAlign: "center", boxShadow: 'unset' }}>
        {memos.map((memo) => (
          <div
          key={memo.id}
          draggable
          onDragStart={handleDragStart(memo.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, memo.id)}
        >
          <NotePage memo={memo} />
        </div>
        ))}
      </Container>
      </ThemeProvider>
  );
};

export default NoteBook;