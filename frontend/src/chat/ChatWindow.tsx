//LAAR/Pikaviesti/frontend/src/components/ChatWindow.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  List,
  ListItem,
  useTheme,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import SocketComponent from "./SocketComponent";
import { Socket } from "socket.io-client";
// import Login from "@mui/icons-material/Login";
import "./ChatWindow.css";
import { Message } from "../types/typesFrontend";

interface ChatWindowProps {
  onClose: () => void;
  isOpen: boolean;
  user?: { name: string };
}

const formatMessageTimestamp = (
  timestamp: Date,
  includeDate: boolean = true
): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: includeDate ? "numeric" : undefined,
    month: includeDate ? "numeric" : undefined,
    day: includeDate ? "numeric" : undefined,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedTimestamp = new Intl.DateTimeFormat("fi-FI", options).format(
    timestamp
  );
  // Capitalize the first letter of weekdays
  return formattedTimestamp.replace(/\b\w/g, (char) => char.toUpperCase());
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  onClose,
  isOpen /* user */,
}) => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<Socket | null>(null);
  // const [loggedIn, setLoggedIn] = useState<boolean>(Boolean(user?.name));
  // const [loggedInUser, setLoggedInUser] = useState<string | undefined>(
  //   user?.name
  // );
  // const [isLoginVisible, setLoginVisible] = useState<boolean>(true);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);

  const toggleWindowVisibility = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationResult = (confirmed: boolean) => {
    if (confirmed) {
      onClose();
    }
    setConfirmationDialogOpen(false);
  };

  /* const handleLogin = (combinedString: string) => {
    setLoggedIn(true);
    setLoggedInUser(combinedString);
    console.log("User logged in:", loggedInUser);
  }; */

  const handleSendMessage = () => {
    const now = new Date();
    const defaultUsername = "Anonymous";

    const userMessage: Message = {
      id: "userMessage-" + now.getTime(),
      senderId: defaultUsername,
      receiverId: "LAAR Chattirobotti",
      message: inputMessage,
      text: `${defaultUsername}: ${inputMessage}`,
      isUser: true,
      timestamp: now,
    };

    console.log("Sending message:", userMessage);
    setMessages([...messages, userMessage]);
    setInputMessage("");

    if (socketRef.current) {
      // Emit the message to the server
      socketRef.current.emit(
        "userMessage",
        userMessage,
        (acknowledgment: string) => {
          console.log("Message acknowledged by the server:", acknowledgment);
        }
      );
    }
  };

  // Welcome message when the ChatWindow is opened
  useEffect(() => {
    if (isOpen) {
      const welcomeMessage: Message = {
        id: "welcomeMessage",
        senderId: "LAAR Chattirobotti",
        receiverId: "User1",
        message: "ChatWindow opened",
        text:
          "Moikka ja tervetuloa LAARille! Olen LAAR, asiakaspalvelurobotti." +
          "Suoriudun parhaiten, kun kirjoitat lyhyen ja selkeän kysymyksen. Kuinka voin olla avuksi?" +
          "<br /><br />Jos kirjaudut Minun LAARiin, voit tehdä myös itse muutoksia profiilisi ja palveluihisi ja pääset tarvittaessa asiakaspalvelun chatiin.",

        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Scroll to the bottom of the input field when new messages are added
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /*   useEffect(() => {
    console.log("loggedInUser updated:", loggedInUser);
    if (loggedInUser) {
      // Directly set inputMessage to the user's message
      setInputMessage(``);
    }
  }, [loggedInUser]); */

  const onMessageReceived = (message: Message) => {
    // Add timestamp to the received message
    message.timestamp = new Date();

    // Check if the message is already in the state to avoid duplication
    if (!messages.some((msg: Message) => msg.id === message.id)) {
      // Handle the received message, update the state, etc.
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <>
      {isOpen && (
        <Paper
          style={{
            position: "fixed",
            bottom: 50,
            right: 0,
            padding: theme.spacing(2),
            maxWidth: 400,
            margin: "auto",
          }}
        >
          {/* ChatWindow header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "#57bfb1",
            }}
          >
            <Tooltip title="Chatin logo" placement="top">
              <span role="img" aria-label="robot" style={{ fontSize: "24px" }}>
                🤖
              </span>
            </Tooltip>
            <div
              style={{
                textAlign: "center",
                flex: 1,
                ...theme.typography.h2,
                color: "white",
              }}
            >
              <Typography variant="h5">LAAR Chattirobotti </Typography>
            </div>
            <Tooltip title="Piilota keskusteluikkunan sisältö" placement="top">
              <span
                onClick={toggleWindowVisibility}
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  color: "white",
                }}
              >
                {"\u2304 "}
              </span>
            </Tooltip>

            {/* Render the ConfirmationDialog directly */}
            <Dialog
              open={isConfirmationDialogOpen}
              onClose={() => handleConfirmationResult(false)}
              style={{
                width: 300,
              }}
            >
              <DialogTitle>Vahvistus</DialogTitle>
              <DialogContent sx={{ padding: "20px", backgroundColor: "#ccc" }}>
                <Typography
                  style={{
                    fontSize: "16px",
                    margin: "0",
                    marginTop: "10px",
                  }}
                >
                  Oletko varma, että haluat sulkea chattirobotti-sovelluksen?
                  Jos suljet sen, vanhat viestisi poistetaan.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  className="custom-button"
                  onClick={() => handleConfirmationResult(false)}
                  color="primary"
                  style={{ color: "white" }}
                >
                  Kumoa
                </Button>
                <Button
                  className="custom-button"
                  onClick={() => handleConfirmationResult(true)}
                  color="primary"
                  style={{ color: "white" }}
                >
                  Kyllä
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <List
            style={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "300px",
              padding: "8px",
              flexDirection: "column",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "gray",
                    marginBottom: "4px",
                    textAlign: message.isUser ? "right" : "left",
                  }}
                >
                  {formatMessageTimestamp(message.timestamp)}
                </div>
                <ListItem
                  style={{
                    textAlign: message.isUser ? "right" : "left",
                    backgroundColor: message.isUser ? "#aaffaa" : "#f0f0f0",
                    padding: "8px",
                    borderRadius: "8px",
                    margin: "8px 0",
                  }}
                >
                  {/* Check if the message is from the user, and adjust the displayed text */}
                  {message.isUser ? (
                    <span>
                      {message.senderId}: {message.message}
                    </span>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: message.text }} />
                  )}
                </ListItem>
              </div>
            ))}
            <div ref={inputRef}></div>
          </List>

          <div>
            <input
              type="text"
              placeholder="Kirjoita kysymyksesi tähän..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                marginBottom: theme.spacing(2),
                width: "80%",
                padding: "12px",
                fontSize: "16px",
              }}
            />
            <Button
              variant="contained"
              className="custom-button"
              onClick={handleSendMessage}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Lähetä
            </Button>
          </div>
          {/* 
          {loggedIn ? (
            // Render chat window if logged in
            <div>
              <p>Olet kirjautunut käyttäjänä: {loggedInUser}</p>
            </div>
          ) : (
            // Render login component if not logged in
            isLoginVisible && <Login />
          )} */}
        </Paper>
      )}
      <SocketComponent
        onMessageReceived={onMessageReceived}
        socketRef={socketRef}
      />
    </>
  );
};

export default ChatWindow;
