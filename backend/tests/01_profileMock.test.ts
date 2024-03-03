const request = require("supertest");
import app from "../src/app";
import { describe, test, expect, beforeAll, beforeEach } from "@jest/globals";
import admin from "../src/config/firebseConfig";
import * as types from "./testTypes";
import { jest } from "@jest/globals";

const userBody = {
  email: "testUser@testmail.com",
  password: "testPassword",
};

describe("Profile actions", () => {
  beforeAll(async () => {
    // Create test profile
    /*   const profile: types.ChildProfile = {
      childName: "Test Child",
      birthdate: "2021-01-01",
      avatar: "testAvatar",
      accessRights: true,
      id: "testId",
    }; */
    admin.firestore().autoFlush(true);
    admin.auth().autoFlush(true);
    /*   db.collection("childProfile").add(profile); */
  });
  test("GET /api/profiles should return 401", async () => {
    const response = await request(app).get("/api/profiles");
    expect(response.statusCode).toBe(401);
  });
  test("Create new user, get Profiles, still 401 because no userDoc", async () => {
    const user = await admin.auth().createUser(userBody);
    const token = await user.getIdToken();
    console.log(token);
    const response = await request(app)
      .get("/api/profiles")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
  });
  test("Create userDoc, get Profiles, should return 200, and empty profile", async () => {
    const user = await admin.auth().getUserByEmail(userBody.email);
    const token = await user.getIdToken();
    const db = admin.firestore();
    const userDoc = db.collection("users").doc(user.uid);
    await userDoc.set({ email: user.email });
    const response = await request(app)
      .get("/api/profiles")
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
