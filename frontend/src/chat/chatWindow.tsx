//LAAR/Pikaviesti/frontend/src/components/ChatWindow.tsx
import React, {  useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Paper,
  List,
  ListItem,
  useTheme,
  Button,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import "./ChatWindow.css";
import { Message } from "../types/typesFrontend";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ChattirobottiService  from "./chatRobotService";


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
  return formattedTimestamp.replace(/\b\w/g, (char) => char.toUpperCase());
};


const CHAT_STORAGE_KEY = 'chatMessages';

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChattirobottiResponse = useCallback(
    (response?: Message | Message[]) => {
      if (response) {
        console.log('Received response from Chattirobotti:', response);
        const messagesArray: Message[] = Array.isArray(response) ? response : [response];
        setMessages((prevMessages: Message[]) => [...prevMessages, ...messagesArray]);
      }
    },
    []
  );
  
  // Assuming you have declared chatService within the component
 const chatService = useMemo(() => {
    const service = new ChattirobottiService();
      service.setOnMessageReceived(handleChattirobottiResponse)
    return service;
  }, [handleChattirobottiResponse]);
    
  
  
  const saveToSessionStorage = (key: string, data: Message[]) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };

  const messageToSave: Message[] = messages;
  saveToSessionStorage(CHAT_STORAGE_KEY, messageToSave);

  const loadMessagesFromSessionStorage = (key: string) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };


 
// Handling Chattirobotti Responses
//This effect handles responses from Chattirobotti, updating the messages state accordingly.
  useEffect(() => {
    const handleChattirobottiResponse = (response?: Message | Message[]) => {
      if (response) {
        console.log('Received response from Chattirobotti:', response);
        const messagesArray: Message[] = Array.isArray(response) ? response : [response];
        setMessages((prevMessages: Message[]) => [...prevMessages, ...messagesArray]);
      }
    };

    // Use the new function to handle incoming messages
    chatService.handleIncomingMessages(handleChattirobottiResponse);

    return () => {
      chatService.clearOnMessageReceived();
    };
  }, [chatService, setMessages]);
  
  
  const toggleWindowVisibility = () => {
    onClose();
  };

  // handleSendMessage Function
  const handleSendMessage = () => {
    const now = new Date();
     const defaultUsername = "Anonymous";

      const userMessage: Message = {
      id: "userMessage-" + now.getTime(),
      senderId: defaultUsername,
      receiverId: "LAAR Chattirobotti",
      message: inputMessage,
      text: `Käyttäjä: ${inputMessage}`,
      isUser: true,
      timestamp: now,
    };

     console.log("Sending message:", userMessage);
     setMessages([...messages, userMessage]);
     setInputMessage("");
     chatService.addUserMessageAndGenerateResponse(inputMessage);
    };

  //  This useEffect initializes the chat window when it is open, loading saved messages from session storage and displaying a welcome message.
  useEffect(() => {
    if (isOpen) {
      const savedMessages = loadMessagesFromSessionStorage(CHAT_STORAGE_KEY);
      const welcomeMessage: Message = {
        id: "welcomeMessage",
        senderId: "LAAR Chattirobotti",
        receiverId: "User 1",
        message: "ChatWindow opened",
        text:
          "Moikka ja tervetuloa LAARille! Olen LAAR, asiakaspalvelurobotti." +
          "Suoriudun parhaiten, kun kirjoitat lyhyen ja selkeän kysymyksen. Kuinka voin olla avuksi?" +
          "<br /><br />Jos kirjaudut Minun LAARiin, voit tehdä myös itse muutoksia profiilisi ja palveluihisi ja pääset tarvittaessa asiakaspalvelun chatiin.",

        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage, ...savedMessages]);
    }
  }, [isOpen, setMessages, handleChattirobottiResponse]); 

  // Cleaning Up Message Handling on Component Unmount
 useEffect(() => {
    return () => 
    chatService.clearOnMessageReceived();
  }, [chatService]);
  
  // Scroll to the bottom of the input field when new messages are added
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);



    // Handle the "Enter" key to send the message
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Check if the pressed key is "Enter"
      if (e.key === "Enter") {
        // Prevent the default behavior (e.g., line break in the input field)
        e.preventDefault();
        // Call the function to handle sending the message
        handleSendMessage();
      }
    };
  


  return (
    <>
      {isOpen && (
        <Paper
          style={{
            position: "fixed",
            bottom: 0, // Stick the chat window to the bottom
            right: 0,
            padding: theme.spacing(2),
            maxWidth:  isSmallScreen ? "100%" : 400, // Responsive design
            margin: isSmallScreen ? 0 : "auto", // Center the chat window
          }}
        >
          {/* ChatWindow header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: isSmallScreen ? "8px" : "16px", // Responsive design
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
                  {/* Button added to toggle the chat window visibility */}
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
              maxHeight:   isSmallScreen ? "200px" : "300px",
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
              onKeyDown={handleKeyDown} // Handle the "Enter" key
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