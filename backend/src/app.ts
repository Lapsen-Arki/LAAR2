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

// Run the scheduleHandler every day at midnight
// Schedule format: second, minute, hour, day of month, month, day of week
// 0 0 * * * = every day at midnight, the seconds are not needed.
// For something like every 5 minutes, it would be */5 * * * *
// Or every 5 seconds, it would be */5 * * * * *
// For more information, see https://crontab.guru/

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily cron job");
  const result = await scheduleHandler();
  console.log(result);
});

export default app;
