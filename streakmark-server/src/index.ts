import "dotenv/config";
import express from "express";
import morgan from "morgan";

// Import middleware
import errorHandler from "./middlewares/error-handler";

// Import routes
import UsersRouter from "./routes/users";

// Import utils
import Logger from "./utils/logger";

const app = express();
const port = 3000;

// Setup json body parser
app.use(express.json());

// Setup morgan
app.use(morgan("combined"));

// Setup routes
app.use("/users", UsersRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Setup error handling
app.use(errorHandler);

app.listen(port, () => {
  Logger.success(`Express is listening at http://localhost:${port}`);
});
