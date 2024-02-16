import { Container } from "@mui/material";

import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";
import { useContext, useEffect } from "react";
import { TokenContext } from "../contexts/tokenContext";
import NameDropDown from "../components/index/nameDropDown";

import { getChildProfiles } from "../api/childProfile/getChildProfiles";
import makeChildObject from "../utils/makeChildObject";

export default function IndexPage() {
  const { isLoggedIn, idToken } = useContext(TokenContext);

  // Fetching child profiles and making child object in sessionStorage with name and age:
  useEffect(() => {
    if (isLoggedIn && idToken) {
      // TODO: Make sure this updates after login redirect
      // Fetching childProfiles
      const retrieveDataAndMakeObject = async () => {
        await getChildProfiles(idToken);
        makeChildObject();
      };
      retrieveDataAndMakeObject();
    }
  }, [idToken, isLoggedIn]);

  return (
    <>
      <Container>
        {!isLoggedIn && <LandingComp />}
        <NameDropDown />
        <TimeBlockComp /> {/* <-- Routes to choices page with renderIdentif */}
      </Container>
    </>
  );
}
