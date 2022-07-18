import { Router } from "express";
import joi from "joi";

import { addUser } from "../controllers/users";
import { validateRequest } from "../middlewares/api-utils";

const router = Router();

router.post(
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

export default router;
