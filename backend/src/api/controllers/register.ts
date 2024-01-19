import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import xss from "xss";

const validatePassword = (
  password: string,
  confirmPassword: string,
  res: Response
) => {
  // Check if passwords match
  if (password !== confirmPassword) {
    res.status(400).send("Salasanat eivät täsmää | Passwords do not match");
    return false;
  }
  // Check lowercase letter
  if (!/[a-z]/.test(password)) {
    res
      .status(400)
      .send(
        "Salasanan tulee sisältää vähintään yksi pieni kirjain | Password must include at least one lowercase letter"
      );
    return false;
  }

  // Check uppercase letter
  if (!/[A-Z]/.test(password)) {
    res
      .status(400)
      .send(
        "Salasanan tulee sisältää vähintään yksi iso kirjain | Password must include at least one uppercase letter"
      );
    return false;
  }

  // Check digit
  if (!/\d/.test(password)) {
    res
      .status(400)
      .send(
        "Salasanan tulee sisältää vähintään yksi numero | Password must include at least one digit"
      );
    return false;
  }

  // Check special character
  if (!/[@$!%*?&]/.test(password)) {
    res
      .status(400)
      .send(
        "Salasanan tulee sisältää vähintään yksi erikoismerkki (@$!%*?&) | Password must include at least one special character (@$!%*?&)"
      );
    return false;
  }

  // Check password length
  if (password.length < 8) {
    res
      .status(400)
      .send(
        "Salasanan tulee olla vähintään 8 merkkiä pitkä | Password must be at least 8 characters long"
      );
    return false;
  }

  return true;
};

const validateAndSanitizeName = (name: string, res: Response) => {
  // Check if the name field is empty
  if (!name) {
    return res.status(400).send("Nimi on pakollinen kenttä | Name is required");
  }
  // Check if the name field contains only alphanumeric characters and is less than or equal to 15 characters
  if (!/^[a-zA-Z0-9 ]{1,15}$/.test(name)) {
    res
      .status(400)
      .send(
        "Nimen tulee olla enintään 15 merkkiä pitkä ja saa sisältää vain kirjaimia ja numeroita | Name must contain only alphanumeric characters and be up to 15 characters long"
      );
    return false;
  }
  const sanitizedName = xss(name);
  return sanitizedName;
};

// Registration function
const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password, confirmPassword } = req.body as unknown as {
      email: string;
      name: string;
      password: string;
      confirmPassword: string;
    };

    // Validating password and name. Firebase should validate email already.
    const isPasswordValid = validatePassword(password, confirmPassword, res);
    const isValidName = validateAndSanitizeName(name, res);

    if (!isPasswordValid || !isValidName) {
      return; // Halt registration process if validation fails, response is already sent
    }

    // Create a new user using Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    const registrationDate = new Date();
    const db = admin.firestore();

    const usersCollection = db.collection("users");

    await usersCollection.doc(userRecord.uid).set({
      name: isValidName,
      email: email,
      registrationDate: registrationDate,
    });

    res.status(201).send(`User created successfully: ${userRecord.uid}`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export default registerUser;
