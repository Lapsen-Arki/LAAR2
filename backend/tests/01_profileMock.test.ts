const request = require("supertest");
import app from "../src/app";
import { describe, test, expect, beforeAll, beforeEach } from "@jest/globals";
import { mockAuth } from "./testHelpers";
import admin from "../src/config/firebseConfig";
import * as types from "./testTypes";
import { jest } from "@jest/globals";

describe("Profile actions", () => {
  beforeAll(async () => {
    // Create test profile
    const profile: types.ChildProfile = {
      childName: "Test Child",
      birthdate: "2021-01-01",
      avatar: "testAvatar",
      accessRights: true,
      id: "testId",
    };
    const db = admin.firestore();
    db.autoFlush(true);
    db.collection("childProfile").add(profile);
  });
  beforeEach(async () => {
    jest.resetModules();
    mockAuth();
  });
  test("GET /api/profiles should return 401", async () => {
    const response = await request(app).get("/api/profiles");
    console.log(response.body);
    expect(response.statusCode).toBe(401);
  });
});
