import { Avatar, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChildProfile } from "../../types/typesFrontend";

export default function ChildInfoComp({
  selectedChild,
  mealType = undefined,
}: {
  selectedChild: string | null;
  mealType?: string;
}) {
  const [childData, setChildData] = useState<ChildProfile>();
  useEffect(() => {
    const childProfilesJSON = sessionStorage.getItem("childProfiles");
    if (childProfilesJSON) {
      const childProfiles = JSON.parse(childProfilesJSON) as ChildProfile[];

      const newChildData = childProfiles.find(
        (item) => item.childName === selectedChild
      );
      setChildData(newChildData);
    }
  }, [selectedChild]);

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

          <Grid sx={{ display: "flex" }}>
            {mealType && childData.allergies && (
              <Typography variant="h6">Lapsen allergiat: </Typography>
            )}
            {
              mealType &&
                childData.allergies &&
                childData.allergies.map((allergy) => {
                  return (
                    <Typography
                      key={allergy}
                      variant="body1"
                    >{` ${allergy}`}</Typography>
                  );
                }) // <-- this feature is coming later
            }
          </Grid>
        </>
      )}
    </>
  );
}
