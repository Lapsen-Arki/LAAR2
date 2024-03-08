import Footer from "./Footer";
import Header from "../header/Header";
import React from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import "../../styles/Layout.css";
import ChatWindowLauncher from "../../chat/ChatWindowLauncher";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        <div className="page">{props.children}</div>
        <ChatWindowLauncher />
        <ScrollToTopButton />
      </div>
      <Footer />
    </div>
  );
}
