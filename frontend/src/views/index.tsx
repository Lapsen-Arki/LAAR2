import { Container } from "@mui/material";

import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";

import TimeBlocks from "./TimeBlocking2Demo";

export default function IndexPage() {
  return (
    <>
      <Container>
        <LandingComp />
        <TimeBlocks />
      </Container>
    </>
  );
}
