import { Container } from "@mui/material";

import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";

export default function IndexPage() {
  return (
    <>
      <Container>
        <LandingComp />
        <TimeBlockComp />
      </Container>
    </>
  );
}
