import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { Track } from "../models/Track";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.get("/tracks", requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.id;
  const tracks = await Track.find({
    userId: userId
  });
  res.status(200).send(tracks);
});

router.post(
  "/tracks",
  requireAuth,
  [
    body("name").trim().notEmpty().withMessage("You must provide a name"),
    body("locations")
      .isArray({
        min: 1
      })
      .withMessage("You must provide a locations")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, locations } = req.body;

    try {
      const track = Track.build({
        name,
        locations,
        userId: req.currentUser!.id
      });
      await track.save();
      res.status(200).send({ track });
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  }
);

export default router;
