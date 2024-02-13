import React from 'react';
import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import { useProfileUtils } from './profileUtils';
import ConfirmationDialog from './profileConfirmationDialog';

import {
    Delete as DeleteIcon,
    HelpOutline as HelpOutlineIcon,
  } from '@mui/icons-material';
  
const InvitedCarersComponent: React.FC = () => {
    const { carerProfiles, handleClickDeleteCarer, confirmationDialogOpen, handleDeleteConfirmed } = useProfileUtils();

    return (
        <div>
            <div style={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                    Kutsutut hoitajat:
                </Typography>
                {carerProfiles.length === 0 ? (
                    <div className="Carer">
                        <Card className="Carer-cards">
                            <CardContent className="Carer-content">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title="Hoitajia ei ole vielä lisätty">
                                        <HelpOutlineIcon sx={{ fontSize: 40, color: 'white', borderRadius: '50%', backgroundColor: '#63c8cc' }} />
                                    </Tooltip>
                                    <Typography variant="h6" gutterBottom sx={{ marginLeft: '10px' }}>
                                        Hoitajia ei ole vielä <br /> lisätty
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="Carer">
                        {carerProfiles.map((carer) => (
                            <Card className="cards-wrap" key={carer.receiverUid} style={{ marginBottom: '10px' }}>
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
                                        <IconButton color="error" aria-label="Delete" onClick={() => handleClickDeleteCarer(carer.receiverUid)}>
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
              onClose={handleDeleteConfirmed}
              onConfirm={handleDeleteConfirmed}
            />
        </div>
    );
};

export default InvitedCarersComponent;
