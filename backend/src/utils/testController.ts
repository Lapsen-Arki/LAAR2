import { Request, Response } from "express";
import checkAllUsers from "./checkAllUsers";

export default function testController(req: Request, res: Response) {
  // Do what ever you want with this test function to test some logic or
  // inspecting returned data object structures etc
  checkAllUsers();
}
