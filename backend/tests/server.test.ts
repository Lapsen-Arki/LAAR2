const request = require("supertest");
import app from "../src/app";
import { describe, test, expect } from "@jest/globals";

describe("Server Routes", () => {
  test("GET /api/healthy should return 200", async () => {
    const response = await request(app).get("/api/healthy");
    expect(response.statusCode).toBe(200);
  });
});
