import { Container } from "@mui/material";

import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";
import { useContext, useEffect } from "react";
import { TokenContext } from "../contexts/tokenContext";
import NameDropDown from "../components/index/nameDropDown";

import { getChildProfiles } from "../api/childProfile/getChildProfiles";

export default function IndexPage() {
  const { isLoggedIn, idToken } = useContext(TokenContext);

  // 1. Have to fetch child age and name at some point -> saving to sessionStorage
  useEffect(() => {
    if (isLoggedIn) {
      // Fetching childProfiles
      getChildProfiles(idToken);
    }
  }, [idToken, isLoggedIn]);

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
