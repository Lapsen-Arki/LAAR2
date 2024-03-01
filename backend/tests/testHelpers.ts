// @ts-noncheck
// @ts-ignore
import { Request, Response, NextFunction } from "express";
import { jest } from "@jest/globals";
import checkAuth from "../src/middleware/checkAuth";

export const mockAuth = () => {
  jest.mock("../src/middleware/checkAuth", () => {
    return jest.fn((req, res, next: NextFunction) => next());
  });
};
