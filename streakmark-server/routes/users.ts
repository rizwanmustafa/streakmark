import { Router } from "express";
import joi from "joi";

import { addUser } from "../controllers/users";
import { validateRequest } from "../middlewares/api-utils";

const router = Router();

router.get(
  "/",
  validateRequest({
    body: {
      username: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    },
  }),
  addUser
);
router.post("/", (req, res) => {
  res.send("POST to user");
});

export default router;
