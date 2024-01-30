import admin from "../../config/firebseConfig";

// Apufunktio JWT-tokenin purkamiseen ja UID:n hakemiseen
const getUserIdFromToken = async (idToken: string): Promise<string | null> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    console.error('Virhe JWT-tokenin purkamisessa:', error);
    return null;
  }
};

export { getUserIdFromToken };
