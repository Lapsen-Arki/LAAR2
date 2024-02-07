import { useEffect, useContext } from 'react';
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";
import { useStripe } from '@stripe/react-stripe-js';
import saveSubscription from '../api/saveSubscription';

const handleCheckoutSuccess = async (session: any) => {
	const { idToken } = useContext(TokenContext);
	const { userId } = useContext(UserContext);
	try {
	  const subscriptionId = session.subscription;
  
	  const response = await saveSubscription(idToken, userId);

  
	  const result = await response.json();
  
	  console.log('Subscription information sent to the server:', result);
	} catch (error) {
	  console.error('Error sending subscription information to the server:', error);
	}
  };

const SubscriptionSuccessPage = () => {
  const stripe = useStripe();

  useEffect(() => {
    const handleCheckoutSuccessLocal = async (event: any) => {
      await handleCheckoutSuccess(event.data.object);
    };

    if (stripe) {
      window.addEventListener('stripe-checkout-session-completed', handleCheckoutSuccessLocal);
    }

    return () => {
      window.removeEventListener('stripe-checkout-session-completed', handleCheckoutSuccessLocal);
    };
  }, [stripe]);

  return (
    <div>
      <h1>Processing...</h1>
    </div>
  );
};

export default SubscriptionSuccessPage;
