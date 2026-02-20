import "dotenv/config.js";
import express from "express";
import cors from "cors";
import config from "./config/config.js";
import logger from "./utils/logger.js";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/message.js";
import { authenticate } from "./middleware/auth.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/chat", authenticate, chatRouter);

app.listen(config.server.port, () => {
  logger.log({
    level: "debug",
    message: `The server has started on port: ${config.server.port}`,
  });
});
