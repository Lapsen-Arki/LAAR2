import { beforeAll, afterAll } from "@jest/globals";
import { Server } from "http";
import createApp from "./createApp";
let server: Server;
let app;

beforeAll((done: () => void) => {
  app = createApp();
  server = app.listen(3000, done);
});
afterAll((done: () => void) => {
  server.close(done);
});
