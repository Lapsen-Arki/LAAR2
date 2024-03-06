import React, { useState } from 'react';
import { Memo } from '../../types/typesFrontend';
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../../styles/formThemeMUI";
import {
    Button,
    Select,
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
    Box,
} from "@mui/material";

interface MemoCreatorProps {
  addMemo: (memo: Memo) => void;
}

const MemoCreator: React.FC<MemoCreatorProps> = ({ addMemo }) => {
  const [memoType, setMemoType] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!memoType || !content) {
      alert('Molemmat kentät ovat pakollisia!');
      return;
    }

    const newMemo: Memo = {
      id: Date.now().toString(), // Käytetään Date.now() generoidaksemme uniikin id:n muistilapulle.
      type: memoType,
      content: content,
    };

    addMemo(newMemo); // Lisää muistelma tilaan ja tallenna Session Storageen

    setMemoType(''); // Tyhjennä lomakkeen kentät
    setContent('');
  };

  return (
    <ThemeProvider theme={formTheme}>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <FormControl fullWidth>
              <InputLabel id="memoType-label">Tyyppi *</InputLabel>
              <Select
                labelId="memoType-label"
                id="memoType"
                value={memoType}
                label="Tyyppi"
                onChange={(e) => setMemoType(e.target.value)}
                required
              >
                <MenuItem value=""><em>Valitse tyyppi</em></MenuItem>
                <MenuItem value="post-it">Post-it</MenuItem>
                <MenuItem value="balloon">Ilmapallo</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box marginBottom={2}>
            <TextField
              id="content"
              label="Sisältö"
              multiline
              fullWidth
              minRows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Box>
          
          <Button
            sx={{ marginTop: 2, marginBottom: 2 }}
            type="submit"
            variant="contained"
          >
            Luo muistilappu
          </Button>
        </form>
    </ThemeProvider>
  );
};

export default MemoCreator;