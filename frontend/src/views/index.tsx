import { Container } from "@mui/material";

import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";
import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";

export default function IndexPage() {
  const { isLoggedIn } = useContext(TokenContext);
  return (
    <>
      <Container>
        {!isLoggedIn && <LandingComp />}
        <TimeBlockComp />
      </Container>
    </>
  );
}
