import { firestore } from 'firebase-admin';
import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import stripeConf from "../../config/stripeClient"
/*
const Stripe = require('stripe');
const stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);
*/

const stripe = stripeConf()

const startSubscription = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
	try {
		console.log("start subscription aloitettu")
		const db = admin.firestore();
		const userId = req.params.id;
		console.log(userId)
		const userDocRef = db.collection('users').doc(userId);
	
		const userDoc = await userDocRef.get();
	
		if (!userDoc.exists) {
			console.log("käyttäjää ei löytynyt")
			return res.status(404).json({ error: 'User not found' });
		}
		console.log("käyttäjä löydetty")
		
		const stripeCustomerId = userDoc.data()?.stripeCustomerId;

		if (!stripeCustomerId) {
			try {
			console.log("stripe id:tä ei löytynyt")
			/*
			const stripeCustomer = await stripe.customers.create({
				name: userDoc.data().name,
				email: userDoc.data().email,
			  });
			*/
			console.log("stripe id luotu, seuraavaksi tallennetaan")
			/*
			await userDoc.set({
				stripeCustomerId: stripeCustomer.id,
			  }); 
			console.log('Customer created and Stripe ID saved:', stripeCustomer.id);*/
		} catch (error) {
			console.error('Error creating customer and saving to Firebase:', error);
		  }
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'subscription',
			customer: stripeCustomerId,
			line_items: [
				{
					price: 'price_1ObLeAK45umi2LZd5XwwYvam',
					quantity: 1,
				},
			],
			success_url: 'http://localhost:5173/subscription-success',
			cancel_url: 'http://localhost:5173/subscription-cancel',
		});
		return res.json({ sessionId: session.id });
	} catch (error) {
		console.error('Error starting subscription:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	  }
};

const saveSubscription = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
	try {
		console.log("backend - saveSubscription alkaa")
	  const { userId, subscriptionId } = req.body;
  
	  if (!subscriptionId || !userId) {
		return res.status(400).json({ error: 'Missing required parameters' });
	  }

	  const db = admin.firestore();
  
	  const userRef = db.collection('users').doc(userId);
	  await userRef.set(
		{
		  stripeSubscriptionId: subscriptionId,
		},
		{ merge: true }
	  );
	  console.log("backend - subscriptionid tallennettu")
	  return res.status(200).json({ success: true });
	} catch (error) {
	  console.error('Error saving subscription:', error);
	  return res.status(500).json({ error: 'Internal Server Error' });
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

		//await stripe.subscriptions.del(subscriptionId);

		await userDocRef.update({ subscriptionStatus: 'canceled' });

		res.json({ status: 'canceled' });
	} catch (error) {
		console.error('Error canceling subscription:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getSubscriptionById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
		console.log("backend - luodaan db")
        const db = admin.firestore();
        const userId = req.params.id;
		console.log(userId)
        const userDocRef = db.collection('users').doc(userId);

        const userDoc = await userDocRef.get();
		console.log("backend - käyttäjä haettu")
        if (!userDoc.exists) {
			console.log("backend - käyttäjää ei löytynyt")
            return res.status(404).json({ error: 'User not found' });
        }

        const stripeSubscriptionId = userDoc.data()?.stripeSubscriptionId;
		console.log("backend - asetettu stripesubscriotionid")

		if (stripeSubscriptionId) {
			console.log("backend - stripesubscriptionid löytyi")
			const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
			return res.status(200).json({ subscription });
		} else {
		console.log("backend - stripesubscriptionid:tä ei löytynyt")
		return res.status(200).json({ message: "No subscription found" });
		}
    } catch (error) {
        console.error('backend - backendissä tapahtui error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
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
export { startSubscription, saveSubscription, cancelSubscription, getSubscriptionById }