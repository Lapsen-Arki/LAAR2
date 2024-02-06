import { Container } from "@mui/material";

import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";
import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";
import NameDropDown from "../components/index/nameDropDown";

export default function IndexPage() {
  const { isLoggedIn } = useContext(TokenContext);

  // 1. Have to fetch child age and name at some point -> using useContext
  // may be easiest way. And savin it to sessionStorage

  return (
    <>
      <Container>
        {!isLoggedIn && <LandingComp />}
        <NameDropDown /> {/* <-- Fetching the child name and age */}
        <TimeBlockComp /> {/* <-- Routes to choices page with renderIdentif */}
      </Container>
    </>
  );
}
