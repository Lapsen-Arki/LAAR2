import express from "express";
import routers from "../src/api/routers";

const createApp = () => {
  const app = express();
  app.use("/api", routers);
  return app;
};

export default createApp;
