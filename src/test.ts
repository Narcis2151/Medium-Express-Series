import express from "express";
import dotenv from "dotenv";

import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  logger.info("App is running!");
});