import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./api/users";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", version: "1.0.0", timestamp: new Date().toISOString() });
});

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
