import React, { useState, useContext } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { TokenContext } from '../contexts/tokenContext';
import startSubscription from '../api/startSubscription';
import cancelSubscription from '../api/cancelSubscription';

interface SubscriptionManagementProps {}

const SubscriptionManagement: React.FC<SubscriptionManagementProps> = () => {
  const { idToken } = useContext(TokenContext);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [stripe, setStripe] = useState<Stripe | null>(null);

  const handleStartSubscription = async () => {
    try {
      const data = await startSubscription(idToken);

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
      setSubscriptionStatus(data.status);
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  return (
    <div>
      <h2>Your Subscription</h2>
      <p>Status: {subscriptionStatus}</p>

      {subscriptionStatus === 'active' ? (
        <button onClick={handleCancelSubscription}>Cancel Subscription</button>
      ) : (
        <button onClick={handleStartSubscription}>Start Subscription</button>
      )}
    </div>
  );
};

export default SubscriptionManagement;
