import Footer from "./Footer";
import Header from "../header/Header";
import React, { useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import "../../styles/Layout.css";
import ChatWindowLauncher from "../../chat/chatWindowLauncher";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

  const handleChatWindowToggle = (isOpen: boolean) => {
    setIsChatWindowOpen(isOpen);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        <div className="page">{props.children}</div>
        <ChatWindowLauncher
          isChatWindowOpen={isChatWindowOpen}
          setIsChatWindowOpen={setIsChatWindowOpen}
        />
        {/* Lisätään handleChatWindowToggle props ScrollToTopButtonille */}
        <ScrollToTopButton
          isChatWindowOpen={isChatWindowOpen}
          handleChatWindowToggle={handleChatWindowToggle}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
