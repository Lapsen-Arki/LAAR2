import { Grid, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Hidden } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NamesAndAgesType } from "../../types/typesFrontend";
import { BlockDataType } from "./blockData";
import {
  taaperoRytmi,
  imeväinenRytmi,
  vauvaRytmi,
  yliKuusiRytmi,
} from "./blockData";
import { TokenContext } from "../../contexts/tokenContext";

export default function TimeBlockComp({
  childName,
}: {
  childName: string | null;
}) {
  const [selectedChildAge, setSelectedChildAge] = useState<number>();
  const [blockData, setBlockData] = useState<BlockDataType[]>();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(TokenContext);

  //   Routing to next page with renderIdentifier:
  const handleBlockClick = (blockTitle: string) => {
    navigate("/choices", { state: { renderIdentifier: blockTitle } });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const childNamesAndAgesJSON = sessionStorage.getItem("childNamesAndAges");
      if (childNamesAndAgesJSON) {
        const childNamesAndAges = JSON.parse(
          childNamesAndAgesJSON
        ) as NamesAndAgesType[];
        const child = childNamesAndAges.find(
          (child) => child.childName === childName
        );
        if (child) {
          console.log("setting child age: ");

          setSelectedChildAge(child.age);
        }
      }
    } else {
      switch (childName) {
        case "Kullervo":
          setSelectedChildAge(12);
          break;
        case "Ulpukka":
          setSelectedChildAge(1);
          break;
        case "Liisa":
          setSelectedChildAge(36);
          break;
      }
    }
  }, [childName, isLoggedIn]);

  useEffect(() => {
    if (selectedChildAge) {
      if (selectedChildAge <= 4) {
        setBlockData(imeväinenRytmi);
      } else if (selectedChildAge >= 4 && selectedChildAge <= 6) {
        setBlockData(vauvaRytmi);
      } else if (selectedChildAge >= 6 && selectedChildAge <= 12) {
        setBlockData(taaperoRytmi);
      } else if (selectedChildAge >= 12) {
        setBlockData(yliKuusiRytmi);
      }
    }
  }, [selectedChildAge]);

  return (
    <>
      <Hidden smDown>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <ArrowForwardIcon />
          <ArrowForwardIcon />
          <ArrowForwardIcon />
        </div>
      </Hidden>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 15,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Mapping the timeBlockData */}
        {blockData &&
          blockData.map((block, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardActionArea
                  key={index}
                  onClick={() => handleBlockClick(block.title)}
                  sx={{ padding: 2, minHeight: 150 }}
                >
                  {childName && <Typography>{childName}</Typography>}
                  <Typography variant="h6">{block.title}</Typography>
                  <Typography variant="body1">{block.period}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
