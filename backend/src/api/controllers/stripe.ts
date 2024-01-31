import { firestore } from 'firebase-admin';
import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import Stripe from 'stripe';

const stripe = require('stripe')('pk_test_51HqdGcK45umi2LZdJtYVobHqBd8GGJjr0ggqdhGTRNisO9fdkOdHIXc1kH96Tpex7dYyj9VlIEGTv90hiMExVn2S00w1xYoflk');

const startSubscription = async (req: Request, res: Response): Promise<void> => {
	try {
		console.log("start subscription aloitettu")
		const db = admin.firestore();
		const userId = req.params.idToken; // tässä antaa vielä arvoksi undefined?
		console.log(userId)
		// tähän väliin logiikka, jolla saa userId:n käyttäjän hakua varten
		const userDocRef = db.collection('users').doc(userId);
	
		const userDoc = await userDocRef.get();
	
		if (!userDoc.exists) {
			console.log("käyttäjää ei löytynyt")
			res.status(404).json({ error: 'User not found' });
		}
		console.log("käyttäjä löydetty")
		
		const stripeCustomerId = userDoc.data().stripeCustomerId;
	
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'subscription',
			customer: stripeCustomerId,
			line_items: [
				{
					price: 'your-stripe-price-id',
				},
			],
			success_url: 'http://localhost:5173/success',
			cancel_url: 'http://localhost:5173/cancel',
		});
	
		res.json({ sessionId: session.id });
	} catch (error) {
		console.error('Error starting subscription:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
};

const cancelSubscription = async (req: Request, res: Response): Promise<void> => {
	try {
		console.log("cancel subscription aloitettu")
		const db = admin.firestore();
		const userId = req.params.id;
		const userDocRef = db.collection('users').doc(userId);

		const userDoc = await userDocRef.get();

		if (!userDoc.exists) {
			res.status(404).json({ error: 'User not found' });
		}

		const currentStatus = userDoc.data().subscriptionStatus;

		if (currentStatus === 'canceled') {
			res.json({ status: 'already-canceled' });
		}

		const stripeCustomerId = userDoc.data().stripeCustomerId;
		const subscriptionId = userDoc.data().stripeSubscriptionId;

		await stripe.subscriptions.del(subscriptionId);

		await userDocRef.update({ subscriptionStatus: 'canceled' });

		res.json({ status: 'canceled' });
	} catch (error) {
		console.error('Error canceling subscription:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getSubscriptionById = async (req: Request, res: Response): Promise<void> => {
	try {
		const db = admin.firestore();
		const userId = req.params.id;
		const userDocRef = db.collection('users').doc(userId);
  
		const userDoc = await userDocRef.get();
  
		if (!userDoc.exists) {
			res.status(404).json({ error: 'User not found' });
		}

		const stripeCustomerId = userDoc.data().stripeCustomerId;

		const subscriptions = await stripe.subscriptions.list({
			customer: stripeCustomerId,
		});

		res.json({ subscriptions });
	} catch (error) {
		console.error('Error fetching subscription information:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

/*
const getSubscriptionById = async (req: Request, res: Response): Promise<void> => {
	const customerId = req.params.id;
	const subscriptions = await stripe.subscriptions.search({
		query: 'status:\'active\' AND metadata[\'customer\']:\'${customerId}\'',
	});
	return subscriptions;
  };
*/
export { startSubscription, cancelSubscription, getSubscriptionById }