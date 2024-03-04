//LAAR/Pikaviesti/frontend/src/components/ChatWindowLauncher.tsx
import React, { useState } from "react";
import { Paper, Tooltip, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { styled } from "@mui/material/styles";
import ChatWindow from "./ChatWindow";

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

const ArrowUp = styled("span")({
  fontSize: "18px",
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
            bottom: 130, // Adjusted the bottom value to move it up
            right: 0,
            padding: "8px",
            cursor: "pointer",
            fontSize: "24px",
            width: "300px",
            textAlign: "center",
          }}
          onClick={toggleChatWindow}
        >
          <Container>
            <StyledChatIcon />
            <Typography sx={{ color: "white" }} variant="h6">
              Kysy Chattirobotilta <ArrowUp>{"\u2303"}</ArrowUp>
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
