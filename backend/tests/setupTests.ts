import { beforeAll, afterAll } from "@jest/globals";
import { Server } from "http";
import { mockAuth } from "./testHelpers";
import createApp from "./createApp";
let server: Server;

beforeAll((done: () => void) => {
  mockAuth();
  app = createApp();
  server = app.listen(3000, done);
});
afterAll((done: () => void) => {
  server.close(done);
});
