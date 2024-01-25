import './Subscription.css'
import Button from '@mui/material/Button';
/* import { useState, useEffect } from 'react'
import { useStripe } from "@stripe/react-stripe-js"; */

// Tähän saa varmasti jonkun paremmankin logiikan
// Missään näistä kentistä ei ole arvoa jos ei ole koskaan ollut tilausta
/*
interface SubscriptionData {
	start_date?: Date;
	next_invoice?: Date;
	canceled_at?: Date;
  }
*/
const Subscription = () => {
	/*
	const stripe = useStripe()
	const [isSubscription, setIsSubscription] = useState(false)
	const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionData>({});
	*/
	const tempSubscriptionBoolean = false;
	  /*
	  useEffect(() => {
		const fetchSubscriptionInfo = async () => {
		  try {
			// TO-DO tähän haku kannasta asiakas-id:llä
			setIsSubscription(onko tilaus vai ei)
			setSubscriptionInfo(customerSubscription);
		  } catch (error) {
			console.error('Error fetching subscription information:', error);
		  }
		};
	
		if (stripe) {
		  fetchSubscriptionInfo();
		}
	  }, [stripe]);
	*/

	return (
		<div className="subscription-page">
			{tempSubscriptionBoolean ?
			<div className="subscription-content">
				<p>Tilauksesi on voimassa! Seuraava laskutus tapahtuu {/* subscriptionInfo.next_invoice?.toDateString()*/}</p>
				<br></br>
				<Button href="linkki" variant="contained" sx={{ backgroundColor: '#39C4A3'}}>
					Keskeytä tilaus
				</Button>
			</div>
			:
			<div className="subscription-content">
				<p>Sinulla ei ole voimassaolevaa tilausta.
					{/* subscriptionInfo.canceled_at? 
					<p>Tilaus on lopetettu {subscriptionInfo.canceled_at.toDateString()}</p>
			: null */}
				</p>
				<br></br>
				<Button href="linkki" variant="contained" sx={{ backgroundColor: '#39C4A3'}}>
					Aloita tilaus
				</Button>
			</div>
			}
		</div>
	)
}

export default Subscription