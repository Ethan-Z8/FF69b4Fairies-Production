import express, { Request, Response, Router } from "express";
import prisma from "../bin/database-connection.ts";
import { Prisma } from "database";

const router: Router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const serviceRequest = req.body as Prisma.ServiceRequestCreateManyInput;
  try {
    await prisma.serviceRequest.createMany({
      data: serviceRequest,
      skipDuplicates: true,
    });
    res.sendStatus(200);
  } catch (e) {
    console.log((e as Error).message);
    res.sendStatus(400);
  }
});

/**
 * Gets all the service requests from the database
 */

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.serviceRequest.findMany();
    res.json(data);
  } catch (e) {
    const typedError = e as Error;
    console.log(typedError.message);
    res.status(400).send("Error in getting service requests");
  }
});

router.post("/updateProgress", async (req: Request, res: Response) => {
  type update = {
    date: Date;
    progress: "Assigned" | "InProgress" | "Completed";
  };
  const updateData = req.body as update;
  try {
    await prisma.serviceRequest.update({
      where: { date: updateData.date },
      data: { progress: updateData.progress },
    });
    res.sendStatus(200);
  } catch (e) {
    console.log((e as Error).message);
    res.sendStatus(400);
  }
});
export default router;
