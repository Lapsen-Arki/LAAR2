import React, { useEffect, useState } from "react";
import { Paper, Tooltip, Button } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { styled } from "@mui/material/styles";
import ChatWindow from "./chatWindow";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Määritellään ChatWindowLauncherProps -rajapinta
interface ChatWindowLauncherProps {
  isChatWindowOpen: boolean;
  setIsChatWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledChatIcon = styled(QuestionAnswerIcon)({
  color: "orange",
  fontSize: "24px",
  marginRight: "8px",
  borderRadius: "50%",
  padding: "8px",
});

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
});

const ChatWindowLauncher: React.FC<ChatWindowLauncherProps> = ({ isChatWindowOpen, setIsChatWindowOpen }) => {
  const [bottom, setBottom] = useState<number>(0); // Asetetaan bottom-tilamuuttujan tyyppi

  const toggleChatWindow = () => {
    setIsChatWindowOpen((prev: boolean) => !prev); // Asetetaan prev-parametrin tyyppi
  };

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
      const footerHeight = isMobile ? 280 : 200;

      const scrolledToFooter = window.innerHeight + window.scrollY >= document.body.offsetHeight - footerHeight;
      
      setBottom(scrolledToFooter ? footerHeight : 0);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Tooltip
        className="custom-button"
        title={"Avaa keskusteluikkuna"}
        placement="top"
      >
        <Paper
          style={{
            position: "fixed",
            bottom: bottom,
            right: 5,
            padding: 8,
            cursor: "pointer",
            fontSize: 24,
            width: "auto",
            textAlign: "center",
            opacity: 0.8,
            transition: "bottom 0.3s ease"
          }}
        >
          <Container>
            <StyledChatIcon />
            <Button
              variant="outlined"
              sx={{
                fontSize: 8,
                p: 0,
                width: 2,
                color: "orange",
                borderColor: "orange",
                marginLeft: 1,
              }}
              onClick={toggleChatWindow}
            >
              <KeyboardArrowUpIcon sx={{ fontSize: 20 }} /> 
            </Button>
          </Container>
        </Paper>
      </Tooltip>

      {isChatWindowOpen && (
        <ChatWindow
          onClose={() => setIsChatWindowOpen(false)}
          isOpen={isChatWindowOpen}
        />
      )}
    </>
  );
};

export default ChatWindowLauncher;