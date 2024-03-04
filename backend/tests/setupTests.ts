import { beforeAll, afterAll } from "@jest/globals";
import { Server } from "http";
import request from "supertest";
import app from "../src/app";
import createApp from "./createApp";
export let server: Server;

beforeAll((done: () => void) => {
  server = app.listen(3000, done);
  if (process.env.FIRESTORE_INSTANCE !== "test") {
    console.error("Failure in test environment, exit");
    process.exit(1);
  }
});
afterAll((done: () => void) => {
  server.close(done);
});
