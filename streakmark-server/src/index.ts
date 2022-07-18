import "dotenv/config";
import express from "express";
import morgan from "morgan";

// Import database
import connectToDB from "./init/db";

// Import middleware
import errorHandler from "./middlewares/error-handler";

// Import routes
import UsersRouter from "./routes/users";

// Import utils
import Logger from "./utils/logger";

process.on("uncaughtException", (e) => {
  console.error("----- UNCAUGHT EXCEPTION -----");
  console.error("An uncaughtException has occurred:");
  console.error(e);
  console.error("----- UNCAUGHT EXCEPTION -----");
});

const app = express();
const port = parseInt(process.env.STREAKMARK_SERVER_PORT ?? "5000");

connectToDB();


// Setup json body parser
app.use(express.json());

// Setup request counter
let reqeuestCounter = 0;

app.use((_req, _res, next) => {
  reqeuestCounter += 1;
  next();
});

// Setup morgan
app.use(morgan("combined"));

// Setup routes
app.use("/users", UsersRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Streakmark Server",
    requestCount: reqeuestCounter,
    version: process.env.STREAKMARK_SERVER_VERSION ?? "0.0.0",
  });
});

// Setup error handling
app.use(errorHandler);

app.listen(port, () => {
  Logger.success(`Express is listening at http://localhost:${port}`);
});
