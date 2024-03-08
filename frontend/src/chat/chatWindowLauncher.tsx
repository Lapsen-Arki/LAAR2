//LAAR/Pikaviesti/frontend/src/components/ChatWindowLauncher.tsx
import React, { useState } from "react";
import { Paper, Tooltip, Typography, Button } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { styled } from "@mui/material/styles";
import ChatWindow from "./ChatWindow";
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

  const toggleChatWindow = () => {
    setIsChatWindowOpen((prev) => !prev);
  };

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
            bottom: 0, // Stick to the bottom
            right: 0,
            padding: "8px",
            cursor: "pointer",
            fontSize: "24px",
            width: "300px",
            textAlign: "center",
          }}
          
        >
          <Container>
            <StyledChatIcon />
            <Typography sx={{ color: "white" }} variant="h6">
              Kysy Chattirobotilta 

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
            </Typography>
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