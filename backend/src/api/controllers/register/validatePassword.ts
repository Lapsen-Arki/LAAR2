import { Request, Response } from "express";

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

export default validatePassword;
