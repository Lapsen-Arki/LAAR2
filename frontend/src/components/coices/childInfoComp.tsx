import { Avatar, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChildProfile } from "../../types/typesFrontend";
import { TokenContext } from "../../contexts/tokenContext";
import { childPreviewData } from "../../utils/staticPreviewData";

export default function ChildInfoComp({
  selectedChild,
  mealType = undefined,
}: {
  selectedChild: string | null;
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
          <Grid sx={{ display: "flex" }}>
            {childData.avatar !== "/broken-image.jpg" && (
              <Avatar alt="avatar" src={childData.avatar} />
            )}
            <Typography variant="h4" sx={{ marginLeft: 1 }}>
              {childData.childName}
            </Typography>
          </Grid>
          {mealType && childData.allergies && (
            <>
              <Typography variant="h6">Lapsen allergiat: </Typography>
              <Typography style={{ fontSize: "small" }}>
                (HUOM. Allergioita ei oiteta huomioon ruokasuosituksissa.
                Tarkista allergeenit aina pakkauksesta.)
              </Typography>
            </>
          )}
          <Grid sx={{ display: "flex" }}>
            {
              mealType &&
                childData.allergies &&
                childData.allergies.map((allergy, index) => {
                  return (
                    <Typography
                      sx={{ marginRight: 1 }}
                      key={allergy}
                      variant="body1"
                    >
                      <strong>{allergy}</strong>
                      {childData.allergies &&
                        index !== childData.allergies.length - 1 &&
                        ","}
                    </Typography>
                  );
                }) // <-- this feature is coming later
            }
          </Grid>
        </>
      )}
    </>
  );
}
