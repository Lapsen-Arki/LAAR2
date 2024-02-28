import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingComponent: React.FC = () => {
  return (
    <CircularProgress sx={{ color: '#63c8cc' }} />
  );
}

export default LoadingComponent;