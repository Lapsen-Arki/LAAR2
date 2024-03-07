import React from 'react';
import { Memo } from '../../types/typesFrontend';
import './noteBook.css'; // Muistilappujen ulkoasun

// Komponentti, joka edustaa yksittäistä muistilappua
const NotePage: React.FC<{ memo: Memo }> = ({ memo }) => {
  // Funktio, joka määrittelee, miten muistilapun sisältö renderöidään riippuen sen tyypistä
  const renderMemoContent = () => {
    switch (memo.type) {
      case 'post-it':
        return <div className="post-it-memo">{memo.content}</div>; // Renderöi muistilappuna post-it-tyylisen elementin
      case 'balloon':
        return <div className="balloon-memo">{memo.content}</div>; // Renderöi muistilappuna balloon-tyylisen elementin
      default:
        return <div>Muistilapun tyyppiä ei ole tuettu</div>; // Renderöi viestin, jos muistilapun tyyppiä ei ole tuettu
    }
  };

  // Renderöi muistilapun sisällön
  return (
    <div className="note-page">
      {renderMemoContent()} {/* Kutsuu renderMemoContent-funktiota muistilapun sisällön renderöimiseksi */}
    </div>
  );
};

export default NotePage;