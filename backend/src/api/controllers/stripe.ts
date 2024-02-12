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

        const stripeSubscriptionId = userDoc.data()?.stripeSubscriptionId;
		console.log("backend - asetettu stripesubscriptionid")

		//koodia, mikäli maksukortti tallennetaan stripen sourceen
		
		if (!stripeSubscriptionId) {
/*
stripe.customers.createSource(
  userId,
  { source: userDoc.stripeCardToken },
  (err: Stripe.Error | null, source: Stripe.cards.ICardSource | Stripe.bankAccounts.IBankAccount | null) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log('New source added to customer:', source);
      // Use source.id as needed
    }
  }
);
*/
/*
const tempToken = await stripe.tokens.create({
	card: {
	  number: '4242424242424242',
	  exp_month: '5',
	  exp_year: '2024',
	  cvc: '314',
	},
  });
*/
/*
const source = await stripe.sources.create({
  type: 'card',
  owner: {
    email: userDoc.data().email,
  },
  token: userDoc.data().stripeCardToken,
});
*/
/*
const customerSource = await stripe.customers.createSource(
	userDoc.data().stripeCustomerId,
	{
	  source: 'tok_fi',
	}
  );
*/
			console.log("backend - subscriptionia ei ollut olemassa joten luodaan uusi")
			const subscription = await stripe.subscriptions.create({
				customer: stripeCustomerId,
				items: [{ plan: "price_1ObLeAK45umi2LZd5XwwYvam" }],
		 	 });
			await userDocRef.update({ stripeSubscriptionId: subscription.id });
			console.log("subscription id: ", subscription.id)
			return res.status(200).json({ subscription });
		} else {
			console.log("backend - stripesubscriptionid löytyi")
			const oldSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);


			if (oldSubscription.status == 'canceled') {
				console.log("ei ole voimassa kokeilujaksoa")
				const subscription = await stripe.subscriptions.resume(
					userDoc.stripeSubscriptionId,
					{
					  billing_cycle_anchor: 'now',
					}
				  );
				await userDoc.update({ stripeSubscriptionId });
				return res.status(200).json({ subscription });
			}
		}
		
		/*
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
		*/
	} catch (error) {
		console.error('Error starting subscription:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	  }
	  console.log("status voi olla joku muu, unpaid tms joten tämä on erikoistapaus?")
	  return res.status(200).json({ message: "Ota yhteyttä ylläpitoon tilauksen aloittamiseksi." });
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
		console.log("backend - asetettu stripesubscriptionid")

		if (stripeSubscriptionId) {
			console.log("backend - stripesubscriptionid löytyi")
			const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
			const { created, current_period_end } = subscription;
			return res.status(200).json({ created, current_period_end });
		} else {
		console.log("backend - stripesubscriptionid:tä ei löytynyt")
		return res.status(200).json(null);
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