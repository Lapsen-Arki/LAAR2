import { AddDataToDatabase } from "../../types/types";
import { Request, Response } from "express";

const adminPage = async (req: Request, res: Response) => {
  try {
    const addDataObject = req.body as unknown as AddDataToDatabase;
    console.log(addDataObject);
    res
      .status(201)
      .send(
        `Admin page connection succesful: ${JSON.stringify(addDataObject)}`
      ); // Testing response! Replace with real response.
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export default adminPage;
