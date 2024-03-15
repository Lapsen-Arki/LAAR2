import { describe, it, expect, beforeAll } from "@jest/globals";
import request from "supertest";
import { server } from "./setupTests";
import admin from "../src/config/firebseConfig";

describe("Register", () => {
  beforeAll(async () => {
    await admin.auth().autoFlush(true);
    await admin.firestore().autoFlush(true);
  });

  it("Register with valid data", async () => {
    const response = await request(server)
      .post("/api/register")
      .send({
        email: "testmail@test.com",
        name: "Tester",
        phoneNumber: "",
        password: "TestiSalasana!1",
        confirmPassword: "TestiSalasana!1",
        accept: true,
        token: { id: "tok_visa" },
      });
    console.log(response.text);
    expect(response.status).toBe(201);
  });
});
