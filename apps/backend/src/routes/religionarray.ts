import express, { Router, Request, Response } from "express";
import { ReligionFeedback } from "../ReligionFeedback";

const router: Router = express.Router();

const religionFeedbackArray: ReligionFeedback[] = [];
// const religionFeedback: ReligionFeedback = {name, priority, location, religion, reason, status};

router.post("/create", async function (req: Request, res: Response) {
  const test: ReligionFeedback = req.body;
  religionFeedbackArray.push(test);
  console.log(religionFeedbackArray);
  res.status(200).json("added db object");
});

router.get("/", async function (req: Request, res: Response) {
  res.status(200).json(religionFeedbackArray);
});

export default router;
