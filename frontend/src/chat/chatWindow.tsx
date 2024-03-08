import React, { useState, useEffect, useRef } from "react";
import { Paper, List, ListItem, useTheme, Button, Tooltip, Typography, useMediaQuery } from "@mui/material";
import "./ChatWindow.css";
import { Message } from "../types/typesFrontend";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatRobotService from "./chatRobotService";

interface ChatWindowProps {
  onClose: () => void;
  isOpen: boolean;
  user?: { name: string };
}

const formatMessageTimestamp = (
  timestamp: Date | string,
  includeDate: boolean = true
): string => {
  if (typeof timestamp === 'string' || isNaN(new Date(timestamp).getTime())) {
    return '';
  }

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
    new Date(timestamp)
  );
  return formattedTimestamp.replace(/\b\w/g, (char) => char.toUpperCase());
};

const CHAT_STORAGE_KEY = "chatMessages";

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatService = useRef(new ChatRobotService()); // Ref to store the instance

  useEffect(() => {
    const cleanupChatService = chatService.current;
    return () => {
      //("Cleanup");
      cleanupChatService.clearOnMessageReceived(); // Accessing the current instance method
    };
  }, []);

  useEffect(() => {
    const onMessageReceivedCallback = (response?: Message | Message[]) => {
      if (response) {
        //("Received response from Chattirobotti:", response);
        const messagesArray: Message[] = Array.isArray(response) ? response : [response];
        setMessages((prevMessages: Message[]) => [...prevMessages, ...messagesArray]);
      }
    };

    chatService.current.setOnMessageReceived(onMessageReceivedCallback); // Setting callback
  }, []);

  useEffect(() => {
    if (isOpen && initialLoad) {
      const savedMessages = JSON.parse(sessionStorage.getItem(CHAT_STORAGE_KEY) || "[]");
      const welcomeMessageAlreadyExists = savedMessages.some((message: Message) => message.id === "welcomeMessage");
      const welcomeMessage: Message = {
        id: "welcomeMessage",
        senderId: "LAAR Chattirobotti",
        receiverId: "User 1",
        message: "ChatWindow opened",
        text: "Moikka ja tervetuloa LAARille! Olen LAAR, asiakaspalvelurobotti." +
          "Suoriudun parhaiten, kun kirjoitat lyhyen ja selkeän kysymyksen. Kuinka voin olla avuksi?" +
          "<br /><br />Jos kirjaudut Minun LAARiin, voit tehdä myös itse muutoksia profiilisi ja palveluihisi ja pääset tarvittaessa asiakaspalvelun chatiin.",
        isUser: false,
        timestamp: new Date(),
      };
      if (!welcomeMessageAlreadyExists) {
        setMessages([welcomeMessage, ...savedMessages]);
      } else {
        setMessages(savedMessages);
      }
      setInitialLoad(false);
    }
  }, [isOpen, setMessages, initialLoad]);

  useEffect(() => {
    if (!initialLoad) {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, initialLoad]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleWindowVisibility = () => {
    onClose();
  };

  const handleSendMessage = () => {
    const now = new Date();
    const defaultUsername = "Käyttäjä";
  
    const userMessage: Message = {
      id: "userMessage-" + now.getTime(),
      senderId: defaultUsername,
      receiverId: "LAAR Chattirobotti",
      message: inputMessage,
      text: inputMessage,
      isUser: true,
      timestamp: now,
    };
  
    //("Sending message:", userMessage);
  
    setMessages([...messages, userMessage]); // Always append the user's message to the messages array
  
    setInputMessage("");
    chatService.current?.addUserMessageAndGenerateResponse(inputMessage);
  };

  return (
    <>
      {isOpen && (
        <Paper
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            padding: theme.spacing(2),
            maxWidth: isSmallScreen ? "100%" : 400,
            margin: isSmallScreen ? 0 : "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: isSmallScreen ? "8px" : "16px",
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
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: 8,
                    p: 0,
                    width: 2,
                    color: "orange",
                    borderColor: "orange",
                  }}
                  onClick={toggleWindowVisibility}
                >
                  <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                </Button>
              </span>
            </Tooltip>
          </div>
          <List
            style={{
              flex: 1,
              overflowY: "auto",
              maxHeight: isSmallScreen ? "200px" : "300px",
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
                  {message.isUser ? (
                    <span>
                      {message.message}
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
              onKeyDown={handleKeyDown}
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
        </Paper>
      )}
    </>
  );
};

export default ChatWindow;