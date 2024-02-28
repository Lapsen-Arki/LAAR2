const request = require("supertest");
import app from "../src/app";
import { describe, test, expect } from "@jest/globals";

describe("Server Routes", () => {
  // Test server initialization with api/halive route
  test("GET /api/alive should return 200", async () => {
    const response = await request(app).get("/api/alive");
    expect(response.statusCode).toBe(200);
    if (response.statusCode !== 200) {
      console.error("Server is not running, exit");
      process.exit(1);
    }
  });
  test("Check firebase instance", async () => {
    const instance = process.env.FIRESTORE_INSTANCE;
    expect(instance).toBe("test");
    if (instance !== "test") {
      console.error("Failure in test environment, exit");
      process.exit(1);
    }
  });
});
