import admin from "../config/firebseConfig";
import { UserData } from "../types/typesBackend";

export async function scheduleHandler() {
  const accountsToRemove = await getAccountsToRemove();
  console.log("Accounts to remove: ", accountsToRemove);
}

async function getAccountsToRemove() {
  const db = admin.firestore();
  const usersCollection = db.collection("users");
  const users = await usersCollection.get();
  const accountsToRemove: string[] = [];
  const today = new Date();
  const thresholdDate = new Date(today.setDate(today.getDate() - 30));
  users.forEach((userDoc: UserData) => {
    const user = userDoc.data();

    if (user.emailVerified !== true && user.registrationDate < thresholdDate) {
      accountsToRemove.push(userDoc.id); // Push the document ID
    }
  });
  return accountsToRemove;
}
