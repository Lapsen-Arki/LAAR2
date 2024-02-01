import { Container } from "@mui/material";

import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";
import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";
import NameDropDown from "../components/index/nameDropDown";

export default function IndexPage() {
  const { isLoggedIn } = useContext(TokenContext);

  return (
    <>
      <Container>
        {!isLoggedIn && <LandingComp />}
        <NameDropDown />
        <TimeBlockComp />
      </Container>
    </>
  );
}
