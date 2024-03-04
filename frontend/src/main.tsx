import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ChatWindowLauncher from "./chat/ChatWindowLauncher.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ChatWindowLauncher />
  </React.StrictMode>
);
