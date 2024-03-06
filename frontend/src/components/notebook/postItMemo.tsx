import React from 'react';
const PostItMemo: React.FC<{ content: string }> = ({ content }) => {
  return (
    <>
      {content}
    </>
  );
};
export default PostItMemo;