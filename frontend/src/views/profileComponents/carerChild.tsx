// carerChild.tsx

import React from "react";

import { Card, CardContent, Typography, Tooltip } from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const CarerChildComponent: React.FC = () => {
  return (
    <div style={{ flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Hoidettavat lapset:
      </Typography>
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
              <Typography variant="h6" gutterBottom sx={{ marginLeft: "10px" }}>
                Sinua ei ole kutsuttu hoitajaksi
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarerChildComponent;
