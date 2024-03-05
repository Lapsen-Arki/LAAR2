import React from 'react';

const PostIt: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="post-it">
      {content}
    </div>
  );
};

export default PostIt;