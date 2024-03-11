import { Avatar, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChildProfile } from "../../types/typesFrontend";
import { TokenContext } from "../../contexts/tokenContext";
import { childPreviewData } from "../../utils/previewData/childProfiles";

export default function ChildInfoComp({
  selectedChild = sessionStorage.getItem("selectedChild"),
  mealType = undefined,
}: {
  selectedChild?: string | null;
  mealType?: string;
}) {
  const [childData, setChildData] = useState<ChildProfile>();

  const { isLoggedIn, ready } = useContext(TokenContext);
  useEffect(() => {
    if (isLoggedIn && ready) {
      const childProfilesJSON = sessionStorage.getItem("childProfiles");
      if (childProfilesJSON) {
        const childProfiles = JSON.parse(childProfilesJSON) as ChildProfile[];

        const newChildData = childProfiles.find(
          (item) => item.childName === selectedChild
        );
        setChildData(newChildData);
      }
    } else {
      const previewChildData = childPreviewData.find(
        (item) => item.childName === selectedChild
      );
      setChildData(previewChildData);
    }
  }, [isLoggedIn, ready, selectedChild]);

  return (
    <>
      {childData && (
        <>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            {childData.avatar !== "/broken-image.jpg" && (
              <Avatar alt="avatar" src={childData.avatar} />
            )}
            <Typography variant="h4" sx={{ marginLeft: 1 }}>
              {childData.childName}
            </Typography>
          </Grid>
          {mealType && childData.allergies && (
            <>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                variant="h6"
              >
                Lapsen allergiat:
              </Typography>
              {mealType && childData.allergies && (
                <Typography
                  sx={{ marginRight: 1, textAlign: "center" }}
                  variant="body1"
                >
                  <strong>{childData.allergies}</strong>
                </Typography>
              )}
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "small",
                  mt: 2,
                }}
              >
                (HUOM. Allergioita ei oiteta huomioon ruokasuosituksissa.
                Tarkista aina allergeenit.)
              </Typography>
            </>
          )}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Grid>
        </>
      )}
    </>
  );
}
