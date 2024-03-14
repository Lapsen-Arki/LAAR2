import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ScrollToTopButtonProps {
  isChatWindowOpen: boolean;
  handleChatWindowToggle: (isOpen: boolean) => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isChatWindowOpen, handleChatWindowToggle }) => {
  const [isVisible, setVisible] = useState(false);
  const [bottom, setBottom] = useState("60px");

  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      const footerHeight = isMobile ? "300px" : "200px";

      setVisible(scrollPosition > screenHeight / 2);

      if (isChatWindowOpen) {
        // Jos chat-ikkuna on avoinna, asetetaan bottom korkeammaksi
        setBottom("455px");
      } else {
        // Muutoin tarkistetaan, ollaanko footerin alueella
        const scrolledToFooter = window.innerHeight + window.scrollY >= document.body.offsetHeight - parseInt(footerHeight);
        setBottom(scrolledToFooter ? footerHeight : "20px");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isChatWindowOpen]);

  useEffect(() => {
    handleChatWindowToggle(isChatWindowOpen);
    // Siirrä ScrollToTopButton ylös, jos chat-ikkuna avataan
    if (isChatWindowOpen) {
      // ScrollToTopButtonin siirtäminen chat-ikkunan yläkulmaan
      const chatWindowTop = document.getElementById("chatWindow")?.offsetTop || 0;
      window.scrollTo({ top: chatWindowTop, behavior: "smooth" });
    }
  }, [isChatWindowOpen, handleChatWindowToggle]);

  useEffect(() => {
    // Estetään automaattinen ylöspäin vierittäminen, kun ChatWindow avataan
    const handleWindowScroll = (event: Event) => {
      if (isChatWindowOpen) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [isChatWindowOpen]);

  return (
    <Button
      variant="contained"
      style={{
        position: "fixed",
        bottom,
        left: "20px",
        zIndex: 1050,
        opacity: isVisible ? 0.8 : 0,
        backgroundColor: "#f5be3f",
        transition: "opacity 0.3s ease, bottom 0.3s ease",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <KeyboardArrowUpIcon />
    </Button>
  );
};

export default ScrollToTopButton;
