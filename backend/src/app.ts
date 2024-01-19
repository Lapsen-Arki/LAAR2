// ENTRY POINT OF THE NODE/EXPRESS BACKEND
import express from "express";
import routers from "./api/routers";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Middleware (if needed)
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routers);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
