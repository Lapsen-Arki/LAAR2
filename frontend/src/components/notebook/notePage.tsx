import React from 'react';
import { Memo } from '../../types/typesFrontend';

const NotePage: React.FC<{ memo: Memo }> = ({ memo }) => {
  const renderMemoContent = () => {
    switch (memo.type) {
      case 'post-it':
        return <div className="post-it-memo">{memo.content}</div>;
      case 'balloon':
        return <div className="balloon-memo">{memo.content}</div>;
      default:
        return <div>Unsupported memo type</div>;
    }
  };

  return (
    <div className="note-page">
      {renderMemoContent()}
    </div>
  );
};

export default NotePage;
