import React from 'react';

const Balloon: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="balloon">
      {content}
    </div>
  );
};

export default Balloon;