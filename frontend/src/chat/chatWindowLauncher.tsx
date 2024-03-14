//LAAR/Pikaviesti/frontend/src/components/ChatWindowLauncher.tsx
import React, { useState, useEffect } from "react";
import { Paper, Tooltip, Button } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { styled } from "@mui/material/styles";
import ChatWindow from "./chatWindow";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// Custom styled component for colored ChatIcon
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

const ChatWindowLauncher: React.FC = () => {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [bottom, setBottom] = useState(0);

  const toggleChatWindow = () => {
    setIsChatWindowOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Oletetaan, että footerin korkeus on 200px
      const footerHeight = 200;
      const scrolledToFooter = window.innerHeight + window.scrollY >= document.body.offsetHeight - footerHeight;
      
      setBottom(scrolledToFooter ? footerHeight : 0); // Jos footer näkyy, aseta bottom 200px, muuten 0
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
            bottom: bottom, // Stick to the bottom
            right: 5,
            padding: 8,
            cursor: "pointer",
            fontSize: 24,
            width: "auto",
            textAlign: "center",
          }}
        >
          <Container>
            <StyledChatIcon />
              {/* Added a button to open the chat window */}
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
              <KeyboardArrowUpIcon
              sx={{ fontSize: 20}}
              /> 
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