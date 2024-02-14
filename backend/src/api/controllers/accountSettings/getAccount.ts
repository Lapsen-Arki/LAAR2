import { Request, Response } from "express";
const sub: {
  [key: string]: {
    title: string;
    type: string;
    autocomplete: string;
    value: string;
  };
} = {
  name: {
    title: "Name",
    type: "text",
    autocomplete: "name",
    value: "John Doe",
  },
  email: {
    title: "Email",
    type: "email",
    autocomplete: "email",
    value: "john.doe@example.com",
  },
};
export const getAccount = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(sub);
  } catch (error) {}
};
