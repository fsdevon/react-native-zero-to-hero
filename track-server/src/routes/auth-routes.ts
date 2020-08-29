import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../models/User";
import { JWT_SECRET } from "../utils/secrets";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";

const router: Router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must suppy a password")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      throw new BadRequestError("Email already exists.");
    }

    try {
      const user = User.build({
        email,
        password
      });
      await user.save();
      const token = jwt.sign(
        {
          id: user.id
        },
        JWT_SECRET!
      );
      res.status(201).send({ token });
    } catch (err) {
      res.status(422).send(err.message);
    }
  }
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must suppy a password")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      throw new BadRequestError("Invalid password or email");
    }
    try {
      await user.comparePassword(password);
      const token = jwt.sign(
        {
          id: user.id
        },
        JWT_SECRET!
      );
      res.status(200).send({ token });
    } catch (err) {
      throw new BadRequestError("Invalid password or email");
    }
  }
);

export default router;
