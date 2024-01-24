import './timeBlocking.css';
import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Paper,
  styled
} from '@mui/material';

type EventType = {
  [key: string]: {
    [subKey: string]: string;
  };
};

const tapahtumat: EventType[] = [
  {
    "08:30": {
      "1": "Aamiainen",
      "klo": "7.30-8.30"
    }
  },
  {
    "10:30": {
      "2": "Aktiviteetti",
      "klo": "8.30-10.30"
    }
  },
  {
    "11:30": {
      "3": "Lounas",
      "klo": "10.30-11.30"
    }
  },
  {
    "14:00": {
      "4": "Päiväunet",
      "klo": "12.00-14.00"
    }
  },
  {
    "14:15": {
      "5": "Välipala",
      "klo": "14.00-14.15"
    }
  },
  {
    "17:30": {
      "6": "Päivällinen",
      "klo": "17.00-17.30"
    }
  },
  {
    "18:00": {
      "7": "Aktiviteetti",
      "klo": "17.15-18.00"
    }
  },
  {
    "19:00": {
      "8": "Iltapala ja iltatoimet",
      "klo": "18.00-19.00"
    }
  },
  {
    "20:00": {
      "9": "Hyvää yötä",
      "klo": "19.00-20.00"
    }
  }
];

const perhe = {
  "lapset": {
      "Veeti": "1",
      "Oona": "2",
  }
}

const TimeBlock = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [children, setChildren] = useState<Record<string, string>>({});
  const [selectedChild, setSelectedChild] = useState<string | undefined>('');

  const [openChild, setOpenChild] = useState(false);

  const Canvas = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    padding: '5px',
    paddingBottom: '25px',
    color: theme.palette.text.secondary,
  }));
  
  const Item = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(6),
    
  }));
  
  const InnerItemLeft = styled(Item)(() => ({
    textAlign: 'left',
    padding: 0,
    margin: 0,
  }));
  
  const InnerItemCenter = styled(Item)(() => ({
    textAlign: 'center',
    padding: 0,
    margin: 0,
  }));

  const handleChangeChild = (event: SelectChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as string;
    console.log('Valittu lapsi on:', selectedValue);
    setSelectedChild(selectedValue);
  };
  
  
  const handleCloseChild = () => {
    setOpenChild(false);
  };

  const handleOpenChild = () => {
    setOpenChild(true);
  };

  useEffect(() => {
      setEvents(tapahtumat);
      setChildren(perhe.lapset);
    }, []); 

  return (
    <div className="timeBlocking">
      <div className="select">
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="select-child">Lapsi</InputLabel>
        <Select
          labelId="select-child"
          id="child-open-select"
          open={openChild}
          onClose={handleCloseChild}
          onOpen={handleOpenChild}
          value={selectedChild || ''}
          label="Child"
          onChange={handleChangeChild}
        >
          <MenuItem value=""> Valitse </MenuItem>
          {Object.keys(children).map((childKey) => (
          <MenuItem key={childKey} value={childKey}>
            {childKey}
          </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {events.map((event, index) => (
            Object.keys(event).map((key) => (
              <Grid item xs={12} md={4} key={key}>
                <Canvas key={`${key}-canvas`}>
                  {Object.entries(event[key]).map(([subKey, subValue], subIndex) => (
                    <div key={`${subKey}-${subIndex}`}>
                      {subIndex === 0 && (
                        <InnerItemLeft>
                          {index + 1}
                        </InnerItemLeft>
                      )}
                      <InnerItemCenter>
                        {subValue}
                      </InnerItemCenter>
                    </div>
                  ))}
                </Canvas>
              </Grid>
            ))
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default TimeBlock;