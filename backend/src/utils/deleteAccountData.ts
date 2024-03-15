import admin from "../config/firebseConfig";
const deleteUser = async (userId: string) => {
  try {
    // Define the Firestore and Auth admin services
    // Get necessary references and data
    const db = await admin.firestore();
    const auth = await admin.auth();
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();
    const stripeCustomerId = await userDoc.get("stripeCustomerId");
    // Delete the user's Stripe customer account
    if (stripeCustomerId) {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      await stripe.customers.del(stripeCustomerId);
    }
    // Deletion of childProfiles documents:
    const childProfilesSnapshot = await db
      .collection("childProfile")
      .where("creatorId", "==", userId)
      .get();
    // Delete all childProfiles where creatorId matches
    const childProfileDeletePromises = childProfilesSnapshot.docs.map(
      (doc: FirebaseFirestore.DocumentSnapshot) => doc.ref.delete()
    );
    await Promise.all(childProfileDeletePromises);
    // Deletion of childCarers documents:
    const childCarersSnapshot = await db
      .collection("childCarers")
      .where("receiverId", "==", userId)
      .get();

    // Delete carers where receiverId matches
    const carerDeletePromises = childCarersSnapshot.docs.map(
      (doc: FirebaseFirestore.DocumentSnapshot) => doc.ref.delete()
    );
    // Wait for all carer deletions to complete
    await Promise.all(carerDeletePromises);
    // Update carers where senderUID array contains userId
    const carerUpdatePromises = childCarersSnapshot.docs.map(
      async (doc: FirebaseFirestore.DocumentSnapshot) => {
        const senderUID = doc.get("senderUID");
        // Filter out the userId from the senderUID array
        const updatedSenderUID = senderUID.filter(
          (uid: string) => uid !== userId
        );

        // Only update if there's a change
        if (updatedSenderUID.length !== senderUID.length) {
          await doc.ref.update({ senderUID: updatedSenderUID });
        }
      }
    );
    await Promise.all(carerUpdatePromises);
	// Delete memos created by the user
    const memosSnapshot = await db.collection("memos").get();
    memosSnapshot.forEach(async (doc: FirebaseFirestore.DocumentSnapshot) => {
      if (doc.id === userId) {
        await db.collection("memos").doc(doc.id).delete();
      }
    });

    // Finally, delete the user document and the user account
    await userDocRef.delete();
    await auth.deleteUser(userId);
    // Return true if everything went well
    return true;
  } catch (error) {
    // Log the error and return false
    console.error("Error deleting user:", error);
    return false;
  }
};

export { deleteUser };
