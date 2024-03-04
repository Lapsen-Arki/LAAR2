// frontend/src/services/ApiService.tsx

import { io, Socket } from "socket.io-client";

// Set up the socket connection
const socket: Socket = io("http://127.0.0.1:3000");

export const socketInstance = socket;

/* export const sendMessage = async (messageData: {
  message: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
}) => {
  const response = await fetch("http://127.0.0.1:3000/api/messages/send/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData), // Use messageData directly without wrapping in an object
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  return response.json();
}; */

// Function to send a message using WebSocket
export const sendSocketMessage = (message: string) => {
  console.log("Sending message:", message);
  socket.emit("userMessage", message);
};

// Function to listen for messages from WebSocket
export const listenForSocketMessages = (
  callback: (message: string) => void
): (() => void) => {
  const onMessageCallback = (message: string) => {
    callback(message);
  };
  socket.on("chattirobottiMessage", onMessageCallback);

  // Return the cleanup function
  return () => {
    socket.off("chattirobottiMessage", onMessageCallback);
  };
};

// Modified get function to accept dynamic API route
export const get = async (endpoint: string, isUserEndpoint = false) => {
  const baseUrl = isUserEndpoint
    ? "http://127.0.0.1:3000/api/admin/users"
    : "http://127.0.0.1:3000";
  const response = await fetch(`${baseUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
};

export default socketInstance;
