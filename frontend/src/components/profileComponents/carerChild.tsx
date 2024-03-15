import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  Avatar,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { calculateAge, splitNameToFitWidth } from "./profileFunctions";
import { useProfileUtils } from "../../customHooks/useProfileUtils";
import LoadingComponent from "../LoadingComponent";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";

const CarerChildComponent: React.FC = () => {
  const { carerChildProfiles, profilesLoaded } = useProfileUtils();
  const [expandedCollapses, setExpandedCollapses] = useState<{
    [key: string]: boolean;
  }>({});

  const handleToggle = (id: string) => {
    setExpandedCollapses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div style={{ flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Hoidettavat lapset:
      </Typography>
      {profilesLoaded && carerChildProfiles.length == 0 ? (
        <div className="Carer">
          <Card className="Carer-cards">
            <CardContent className="Carer-content">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Sinua ei ole kutsuttu hoitajaksi">
                  <HelpOutlineIcon
                    sx={{
                      fontSize: 40,
                      color: "white",
                      borderRadius: "50%",
                      backgroundColor: "#63c8cc",
                    }}
                  />
                </Tooltip>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginLeft: "10px" }}
                >
                  Sinua ei ole kutsuttu hoitajaksi
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        ""
      )}

      {profilesLoaded && carerChildProfiles.length !== 0 ? (
        <div className="children">
          {carerChildProfiles.map((profile) => (
            <div className="cards-wrap" key={profile.id}>
              <Card className="children-card">
                <Avatar
                  className="card-avatar"
                  src={profile.avatar || "/broken-image.jpg"}
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "#90c2c5",
                  }}
                />
                <CardContent className="card-content">
                  <Typography
                    component="div"
                    variant="h6"
                    className="multiline-text"
                  >
                    {splitNameToFitWidth(profile.childName, 14)}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {calculateAge(new Date(profile.birthdate)).age}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {calculateAge(new Date(profile.birthdate)).birthdayWish}
                  </Typography>
                  <Tooltip title="Vanhempi">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <PersonIcon sx={{ marginRight: "2px" }} />{" "}
                      {profile.creatorName}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Vanhemman sähköpostiosoite">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AlternateEmailIcon sx={{ marginRight: "2px" }} />{" "}
                      {profile.creatorEmail}
                    </Typography>
                  </Tooltip>
                  <Typography
                    variant="subtitle1"
                    onClick={() => handleToggle(profile.id)}
                    color="text.secondary"
                    component="div"
                  >
                    Erityisruokavaliot
                    <IconButton style={{ marginLeft: "auto" }}>
                      <ExpandMoreIcon
                        style={{
                          transform: expandedCollapses[profile.id]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    </IconButton>
                  </Typography>
                  <Collapse
                    in={expandedCollapses[profile.id]}
                    sx={{ maxWidth: "200px" }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      style={{ fontFamily: "monospace" }}
                    >
                      {profile.allergies
                        ? profile.allergies
                        : "Ei lisättyjä erityisruokavalioita."}
                    </Typography>
                  </Collapse>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default CarerChildComponent;
