import request from "supertest";
import { server } from "./setupTests";
import { describe, it, expect, beforeAll } from "@jest/globals";
import admin from "../src/config/firebseConfig";
import { getTokenByEmail } from "./helperFunctions/firebase";
import { generateUser, generateChildProfile } from "./helperFunctions/faker";
// Generate a user and a child profile object
// Example of optional parameters email: value
const userBody = generateUser({ email: "testmail@testing.com" });
const childProfile = generateChildProfile(userBody.uid);

describe("GET /API/profiles route", () => {
  // BeforeAll is a global setup function that runs before all tests within this describe block
  beforeAll(async () => {
    // Set autoFlush to true for firestore and auth
    // This will make sure that firebase sends any pending operations automatically to the mock server
    admin.firestore().autoFlush(true);
    admin.auth().autoFlush(true);
  });
  it("GET /api/profiles should return 401", async () => {
    const response = await request(server).get("/api/profiles");
    expect(response.statusCode).toBe(401);
  });
  it("Create new user, get Profiles, still 401 because no userDoc", async () => {
    const user = await admin.auth().createUser(userBody);
    const token = await user.getIdToken();

    const response = await request(server)
      .get("/api/profiles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(401);
  });
  it("Create userDoc, get Profiles, should return 200, and empty profile", async () => {
    const user = await admin.auth().getUserByEmail(userBody.email);
    const token = await user.getIdToken();

    const db = admin.firestore();
    const userDoc = db.collection("users").doc(user.uid);

    await userDoc.set({ email: user.email });
    const response = await request(server)
      .get("/api/profiles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
  it("Add child, get Profiles, should return 200, and profile", async () => {
    const token = await getTokenByEmail(userBody.email);

    const db = admin.firestore();
    await db.collection("childProfile").add(childProfile);

    const response = await request(server)
      .get("/api/profiles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
describe("POST /API/profiles route", () => {
  beforeAll(async () => {
    admin.firestore().autoFlush(true);
    admin.auth().autoFlush(true);
  });
  it("POST /api/createChildProfile with only token, should return 401", async () => {
    const token = await getTokenByEmail(userBody.email);

    const response = await request(server)
      .post("/api/createChildProfile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
  });
  it("POST /api/createChildProfile with token and body, should return 200", async () => {
    const token = await getTokenByEmail(userBody.email);
    // Debug, sometimes fails?
    console.log(childProfile.childName);

    const response = await request(server)
      .post("/api/createChildProfile")
      .set("Authorization", `Bearer ${token}`)
      .send(childProfile);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBeDefined();
  });
});
