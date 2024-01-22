import { Request, Response } from "express";
import xss from "xss";

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

export default validateAndSanitizeName;
