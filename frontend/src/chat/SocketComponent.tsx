// frontend/src/components/SocketComponent.tsx
import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import socketInstance from "./ApiService";
import { Message } from "../types/typesFrontend";

interface SocketComponentProps {
  onMessageReceived: (message: Message) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  socketRef: React.MutableRefObject<Socket | null>;
}

const SocketComponent: React.FC<SocketComponentProps> = ({
  onMessageReceived,
  onConnect,
  onDisconnect,
  socketRef,
}) => {
  useEffect(() => {
    socketRef.current = socketInstance;

    // Log a custom identifier or the name property of the namespace
    console.log("Namespace identifier:", "chattirobotti");

    const handleConnect = () => {
      console.log("Socket connected");
      if (onConnect) {
        onConnect();
      }
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      if (onDisconnect) {
        onDisconnect();
      }
    };

    const handleChatMessage = (message: Message) => {
      console.log("Received message from server:", message.id, message.text);
      onMessageReceived(message);
    };

    // Listen for 'connect', 'disconnect', and 'chatMessage' events
    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("chatMessage", handleChatMessage);

    // Return cleanup function
    return () => {
      console.log("SocketComponent unmounted");

      // Cleanup the socket listeners
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
      socketInstance.off("chatMessage", handleChatMessage);
    };
  }, []);

  return null;
};

export default React.memo(SocketComponent);
