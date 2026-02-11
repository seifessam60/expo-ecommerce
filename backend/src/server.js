import express from "express";
import path from "path";
import { ENV } from "../config/env.js";
import { connectDB } from "../config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const PORT = ENV.PORT;
const __dirname = path.resolve();

app.use(clerkMiddleware());

app.get("/api/health", (req, res) => {
  res.json({ message: "OK" });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
