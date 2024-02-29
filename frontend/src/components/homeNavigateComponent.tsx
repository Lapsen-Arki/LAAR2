import { Tooltip, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

interface HomeNavigateProps {
  tooltip: string; // Määritellään tooltip-parametrin tyyppi
}

const HomeNavigate: React.FC<HomeNavigateProps> = ({ tooltip }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={handleClick}>
        <HomeIcon />
      </IconButton>
    </Tooltip>
  );
};

export default HomeNavigate;