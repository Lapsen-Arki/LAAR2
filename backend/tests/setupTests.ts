import app from "../src/app";
import { beforeAll, afterAll } from "@jest/globals";
import { Server } from "http";
let server: Server;

beforeAll((done: () => void) => {
  server = app.listen(3000, done);
});
afterAll((done: () => void) => {
  server.close(done);
});
