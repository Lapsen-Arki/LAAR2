import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleAddProfileClick = () => {
    navigate('/profile-edit');
  };

  return (
    <div className="profile-container">
      <div className="profile-view">
        <Button variant="contained" className="custom-button" onClick={handleAddProfileClick}>
          Lisää profiili
        </Button>  
        <Box className="profiles" sx={{ marginTop: '20px' }}>
          <label>Lapset:</label>
          <div className="children">
            Lapsi    
          </div>
          
          <label>Hoitajat:</label>
          <div className="carer">
            Hoitaja
          </div> 
        </Box>    
      </div>
    </div>
  );
}
