import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";

import ConfirmationDialog from "./profileConfirmationDialog";
import { useProfileUtils } from "../../customHooks/useProfileUtils";
import { calculateAge, splitNameToFitWidth } from "./profileFunctions";

const MyChildComponent: React.FC = () => {
  const {
    childProfiles,
    handleEditClick,
    handleClickDeleteProfile,
    confirmationDialogOpen,
    cancelDelete,
    handleDeleteConfirmed,
  } = useProfileUtils();

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
        Omat lapset:
      </Typography>
      {childProfiles.length === 0 ? (
        <div className="cards-wrap">
          <Card className="children-card" sx={{ height: "111px" }}>
            <Tooltip title="Profiileja ei ole vielä luotu">
              <HelpOutlineIcon
                sx={{
                  fontSize: 40,
                  color: "white",
                  borderRadius: "50%",
                  backgroundColor: "#63c8cc",
                  marginLeft: "16px",
                }}
              />
            </Tooltip>
            <CardContent className="card-content">
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Profiileja ei ole vielä luotu
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="children">
          {childProfiles.map((profile) => (
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

                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {`Pääsy muilla: ${profile.accessRights ? "Kyllä" : "Ei"}`}
                  </Typography>

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
                  <Collapse in={expandedCollapses[profile.id]} sx={{maxWidth: '200px'}}>
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

                <div className="card-icons">
                  <Tooltip title="Muokkaa profiilia">
                    <IconButton
                      color="primary"
                      aria-label="Edit"
                      onClick={() => handleEditClick(profile.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Poista profiili">
                    <IconButton
                      color="error"
                      aria-label="Delete"
                      onClick={() => handleClickDeleteProfile(profile.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={cancelDelete}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
};

export default MyChildComponent;
