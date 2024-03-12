// ENTRY POINT OF THE NODE/EXPRESS BACKEND
import express from "express";
import routers from "./api/routers";
import cors from "cors";
import cron from "node-cron";
import { scheduleHandler } from "./utils/scheduleHandler";

const app = express();
const port = process.env.PORT || 3000;

// Middleware (if needed)
app.use(
  cors({
    origin: process.env.FRONTEND_HOSTNAME || "http://localhost:5173", // Replace with your frontend's URL
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routers);

// Listen only if this file is being run directly (not through tests)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

cron.schedule("0 13 * * *", () => {
  console.log("Running daily cron job");
  scheduleHandler();
});

export default app;
