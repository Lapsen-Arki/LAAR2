import admin from "../config/firebseConfig";
import {
  UserRecordList,
  UserForDeletion,
  UserRecord,
  UnverifiedUser,
} from "../types/typesBackend";
import { deleteUser } from "../utils/deleteAccountData";

export async function scheduleHandler() {
  // Setup of listing all users
  let allUsers: UserRecord[] = [];
  let nextPageToken = null;
  let nextPage: UserRecordList;
  // Fetch first 1000 users, and nextPageToken if there are more
  const userList = await admin.auth().listUsers(1000, nextPageToken);
  allUsers = allUsers.concat(userList.users);
  nextPageToken = userList.pageToken;

  // Fetch all users, if there are more than 1000
  while (nextPageToken) {
    nextPage = await admin.auth().listUsers(1000, nextPageToken);
    allUsers = allUsers.concat(nextPage.users);
    nextPageToken = nextPage.pageToken;
  }
  // Filter out unverified users from the record list
  const unverifiedUsers = await getUnverifiedUsers(allUsers);
  // If none, early exit
  if (unverifiedUsers.length === 0) return "No users to delete.";
  // Filter out users for deletion based on time of creation and not being verified.
  const usersForDeletion = await getAccountsToRemove(unverifiedUsers);
  // If none, early exit
  if (usersForDeletion.length === 0) return "No users to delete.";
  // Loop through users and delete them
  for (const user of usersForDeletion) {
    const result = await deleteUser(user.uid);
    if (!result) {
      console.log(`Failed to delete user ${user.email}`);
    } else {
      console.log(`User ${user.email} deleted successfully.`);
    }
  }
  return "Scheduled task completed.";
}

async function getUnverifiedUsers(userList: UserRecord[]) {
  const unverifiedUsers: UnverifiedUser[] = [];
  userList.forEach((user) => {
    if (!user.emailVerified) {
      unverifiedUsers.push({
        uid: user.uid,
        email: user.email,
        creation_time: user.metadata.creationTime,
        last_signin_time: user.metadata.lastSignInTime,
        verified: user.emailVerified,
      });
    }
  });
  return unverifiedUsers;
}

async function getAccountsToRemove(userList: UnverifiedUser[]) {
  const daysToKeep = 30;
  const usersForDeletion: UserForDeletion[] = [];
  const currentDate = new Date();
  userList.forEach((user) => {
    // Get the creation date of the user in milliseconds
    const creationDate = new Date(user.creation_time);
    // Calculate the difference in milliseconds
    const timeDiff = currentDate.getTime() - creationDate.getTime();
    // Calculate the difference in days
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    // If the difference is greater than the set days to keep, add to the list for deletion
    if (daysDiff > daysToKeep) {
      usersForDeletion.push({ uid: user.uid, email: user.email });
    }
  });
  return usersForDeletion;
}
