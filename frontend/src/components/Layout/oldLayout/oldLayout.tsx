import Footer from "./../Footer";
import Header from "../../header/Header";
import React from "react";
//import "../../styles/Layout.css";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (

    <div className="main-container">
      <Header />
      <div className="inner-container">
        <div className="page">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}