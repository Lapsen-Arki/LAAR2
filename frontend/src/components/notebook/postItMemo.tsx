import React from 'react';
import { Paper } from '@mui/material'; 

const PostItMemo: React.FC<{ content: string }> = ({ content }) => {
  return (
    <Paper
      elevation={3}
    >
      {content}
    </Paper>
  );
};

export default PostItMemo;