import express from "express";
import morgan from "morgan";

// Import routes
import UsersRouter from "./routes/users";

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

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
