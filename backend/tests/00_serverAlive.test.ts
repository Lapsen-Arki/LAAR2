import request from "supertest";
import { server } from "./setupTests";
import { describe, expect, it } from "@jest/globals";

describe("Server Routes", () => {
  // Test server initialization with api/halive route
  it("GET /api/alive should return 200", async () => {
    const response = await request(server).get("/api/alive");
    expect(response.statusCode).toBe(200);
  });
});
