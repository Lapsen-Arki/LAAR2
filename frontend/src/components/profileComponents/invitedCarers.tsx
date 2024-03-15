import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import { useProfileUtils } from "../../customHooks/useProfileUtils";
import ConfirmationDialog from "./profileConfirmationDialog";

import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";

const InvitedCarersComponent = ({
  subStatus,
}: {
  subStatus: boolean | null | undefined;
}) => {
  const {
    carerProfiles,
    handleClickDeleteCarer,
    confirmationDialogOpen,
    cancelDelete,
    handleDeleteConfirmed,
  } = useProfileUtils();

  return (
    <div>
      <div style={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          Kutsutut hoitajat:
        </Typography>
        {!subStatus && (
          <div style={{ display: "inline-block" }}>
            <Alert
              className="Carer-cards"
              sx={{
                fontSize: 12,
                maxWidth: 350,
                mb: 2,
                mr: 2,
                background: "#e0f1ff !important",
              }}
              severity="info"
            >
              <strong>Huom.</strong> Kun tilauksesi ei ole voimassa, niin
              hoitajat eivät näe profiilejasi, etkä voi kutsua uusia hoitajia.
            </Alert>
          </div>
        )}
        {carerProfiles.length === 0 ? (
          <div className="Carer">
            <Card
              sx={{ mr: 2, display: "inline-block" }}
              className="Carer-cards"
            >
              <CardContent className="Carer-content">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Hoitajia ei ole vielä lisätty">
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
                    Hoitajia ei ole vielä <br /> lisätty
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="Carer">
            {carerProfiles.map((carer) => (
              <Card
                className="cards-wrap"
                key={carer.receiverUid}
                style={{ marginBottom: "10px" }}
              >
                <CardContent className="card-content">
                  <Typography variant="h6" component="div">
                    {carer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {carer.email}
                  </Typography>
                </CardContent>
                <div className="card-icons">
                  <Tooltip title="Poista hoitaja">
                    <IconButton
                      color="error"
                      aria-label="Delete"
                      onClick={() => handleClickDeleteCarer(carer.receiverUid)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={cancelDelete}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
};

export default InvitedCarersComponent;
