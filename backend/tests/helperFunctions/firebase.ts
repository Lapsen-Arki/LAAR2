import admin from "../../src/config/firebseConfig";

export async function getTokenByEmail(email: string) {
  const user = await admin.auth().getUserByEmail(email);
  return await user.getIdToken();
}
