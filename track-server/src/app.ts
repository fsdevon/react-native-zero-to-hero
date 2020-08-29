import express, { Application, json, Request, Response } from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "./utils/logger";
import { MONGODB_URI } from "./utils/secrets";

import authRoutes from "./routes/auth-routes";
import trackRoutes from "./routes/track-routes";
import { currentUser } from "./middlewares/current-user";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app: Application = express();

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not define");
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.debug("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
  });
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(json());
app.use(bodyParser.json());

app.use(currentUser);

app.use(authRoutes);
app.use(trackRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all("*", (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
