import Footer from "./Footer";
import Header from "../header/Header";
import React from "react";
import { styled } from "@mui/material/styles";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutRoot = styled("div", {
  name: "MuiLayoutRoot",
  slot: "root",
})();

const ContentOuter = styled("div", {
  name: "MuiContentOuter",
  slot: "outer",
})();

const MainContent = styled("div", {
  name: "MuiMainContent",
  slot: "page",
})();

export default function Layout(props: LayoutProps) {
  return (
    <LayoutRoot>
      <Header />
      <ContentOuter>
        <MainContent>{props.children}</MainContent>
      </ContentOuter>
      <Footer />
    </LayoutRoot>
  );
}
