import React, { useState, useContext, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import startSubscription from '../api/startSubscription';
import cancelSubscription from '../api/cancelSubscription';
import getSubscription from '../api/getSubscription';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import '../styles/Subscription.css'
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";
import PleaseLoginModal from "../components/modals/pleaseLoginModal";

// Sivu on vielä kesken, keskeneräisiä funktioita kommentoitu pois

const SubscriptionManagement: React.FC = () => {
	const { idToken } = useContext(TokenContext);
	const { userId } = useContext(UserContext);
	const [subscription, setSubscription] = useState<string | null>(null);
	const [stripe, setStripe] = useState<Stripe | null>(null);
	const [testiboolean, setTestiboolean] = useState(true) // väliaikainen muuttuja testausta varte, true = käyttäjällä on tilaus, false = tilausta ei ole
	const [openLoginModal, setOpenLoginModal] = React.useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
	
      try {
		if (userId) {
			console.log("client - fetching response")
       		const response = await getSubscription(idToken, userId);

        	if ('error' in response) {
				console.log("client - error in response")
          		console.error('Error', response.error);
        	} else {
				console.log("client - ei erroria responsessa")
				console.log(response)
          		setSubscription(response);
        	}
		}
      	} catch (error) {
			
        	console.error('client - Error statusta haettaessa ');
      	}
	}

    if (idToken) {
    	fetchSubscription();
    }
  }, [userId]);


  const handleStartSubscription = async () => {

    try {
      const data = await startSubscription(idToken, userId);

      const stripeInstance = await loadStripe('pk_test_51HqdGcK45umi2LZdJtYVobHqBd8GGJjr0ggqdhGTRNisO9fdkOdHIXc1kH96Tpex7dYyj9VlIEGTv90hiMExVn2S00w1xYoflk');
      setStripe(stripeInstance);

      if (stripeInstance) {
        const { error } = await stripeInstance.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          console.error('Error redirecting to Checkout:', error);
        }
      } else {
        console.error('Stripe is not initialized');
      }
    } catch (error) {
      console.error('Error starting subscription:', error);
    }

  };

  const handleCancelSubscription = async () => {
    try {
      const data = await cancelSubscription(idToken);
      setSubscription(data.status);
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
}

  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  return (
	<div className="subscription-page">
	<Typography variant="h3" component="div">
		Tilaustiedot
	</Typography>
	<br></br>
	<Box
		sx={{
			display: 'flex',
			flexWrap: 'wrap',
		}}>
		<Card variant="outlined">
			<CardContent>
			{
				subscription ? (
				<div>
					<Typography sx={{ fontSize: 14 }} color="text.secondary">
						Sinulla on voimassaoleva tilaus!
					</Typography>
					<br></br>	
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: { xs: '100%', md: 600 } }} aria-label="simple table">
							<TableBody>
								<TableRow>
									<TableCell>Jäsenyys alkanut</TableCell>
									<TableCell align="right">1.1.2024</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Seuraava maksu</TableCell>
									<TableCell align="right">30.1.2024</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td': { borderBottom: 'none' } }}>
									<TableCell>Jäsenyyden hinta</TableCell>
									<TableCell align="right">6,99/kk</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			  ):(
				<div>
					<Typography sx={{ fontSize: 14 }} color="text.secondary">
						Sinulla ei ole voimassaolevaa tilausta.
					</Typography>
					<br></br>
					<Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
						Hanki täysjäsenyys hintaan
					</Typography>
					<Typography variant="h3" component="div">
						6,99/kk
					</Typography>
					<br></br>
					<Divider variant="middle"/>
					<div className="subscription-description">
						<Typography variant="body2" color="text.secondary">
							Aloittamalla tilauksen saat LAAR:in kaikki ominaisuudet käyttöösi.
						</Typography>
					</div>
					<List>
						<ListItem>
							<ListItemIcon>
								<AddCircleRoundedIcon/>
							</ListItemIcon>
							<ListItemText primary="Ominaisuus1" />
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<AddCircleRoundedIcon/>
							</ListItemIcon>
							<ListItemText primary="Ominaisuus2" />
						</ListItem>
					</List>
				</div>
			)}
 			</CardContent>
		</Card>
	</Box>
	<br></br>
	{subscription ? (
		<Button onClick={handleCancelSubscription} variant="contained" sx={{ backgroundColor: '#63c8cc'}}>
			Keskeytä tilaus
		</Button>
		) : (
		<Button onClick={handleStartSubscription} variant="contained" sx={{ backgroundColor: '#63c8cc'}}>
			Aloita tilaus
		</Button>
	)}
	<br></br>
	<br></br>
	<br></br>
	<Switch checked={testiboolean} onChange={() => setTestiboolean(!testiboolean)}/>
	</div>
);
};

export default SubscriptionManagement;
