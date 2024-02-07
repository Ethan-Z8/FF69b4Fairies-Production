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
    res.status(200).json(data);
  } catch (e) {
    const typedError = e as Error;
    console.log(typedError.message);
    res.status(400).send("Error in getting service requests");
  }
});

export default router;
