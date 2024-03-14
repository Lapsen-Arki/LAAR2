import React from "react";
import { Memo } from "../../types/typesFrontend";
import "./noteBook.css"; // Muistilappujen ulkoasun
import DeleteIcon from "@mui/icons-material/Delete";

// Komponentti, joka edustaa yksittäistä muistilappua
const NotePage: React.FC<{ memo: Memo; onDelete: () => void }> = ({
  memo,
  onDelete,
}) => {
  // Funktio, joka määrittelee, miten muistilapun sisältö renderöidään riippuen sen tyypistä
  const renderMemoContent = () => {
    switch (memo.type) {
      case "post-it":
        return (
          <div>
            <div className="post-it-memo">
              {memo.content}{" "}
              <button
                onClick={onDelete}
                style={{
                  border: "none",
                  outline: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ); // Renderöi muistilappuna post-it-tyylisen elementin
      case "balloon":
        return (
          <div>
            <div className="balloon-memo">
              {memo.content}{" "}
              <button
                onClick={onDelete}
                style={{
                  border: "none",
                  outline: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ); // Renderöi muistilappuna balloon-tyylisen elementin
      default:
        return <div>Muistilapun tyyppiä ei ole tuettu</div>; // Renderöi viestin, jos muistilapun tyyppiä ei ole tuettu
    }
  };

  // Renderöi muistilapun sisällön
  return (
    <div className="note-page">
      {renderMemoContent()}{" "}
      {/* Kutsuu renderMemoContent-funktiota muistilapun sisällön renderöimiseksi */}
    </div>
  );
};

export default NotePage;
