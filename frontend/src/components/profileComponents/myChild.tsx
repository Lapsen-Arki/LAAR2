import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";

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

  return (
    <div style={{ flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Omat lapset:
      </Typography>
      {childProfiles.length === 0 ? (
        <Card sx={{ height: "111px" }}>
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
      ) : (
        <div>
          {childProfiles.map((profile) => (
            <div key={profile.id}>
              <Card className="children-card">
                <Avatar
                  className="card-avatar"
                  src={profile.avatar || "/broken-image.jpg"}
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "#90c2c5",
                  }}
                />

                <CardContent>
                  <Typography variant="h6">
                    {splitNameToFitWidth(profile.childName, 14)}
                  </Typography>

                  <Typography variant="subtitle1" color="text.primary">
                    {calculateAge(new Date(profile.birthdate)).age}
                  </Typography>

                  <Typography variant="subtitle1" color="text.primary">
                    {calculateAge(new Date(profile.birthdate)).birthdayWish}
                  </Typography>

                  <Typography variant="subtitle1" color="text.primary">
                    {`Pääsy muilla: ${profile.accessRights ? "Kyllä" : "Ei"}`}
                  </Typography>
                </CardContent>

                <Grid>
                  <Grid item>
                    <Tooltip title="Muokkaa profiilia">
                      <IconButton
                        color="secondary"
                        aria-label="Edit"
                        onClick={() => handleEditClick(profile.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Poista profiili">
                      <IconButton
                        color="error"
                        aria-label="Delete"
                        onClick={() => handleClickDeleteProfile(profile.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
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
