import express, { Request, Response, Router } from "express";
// import PrismaClient from "../bin/database-connection.ts";
import { insertServiceRequest } from "database/src/Requests.ts";
import { Prisma } from "database";

export const serviceRouter: Router = express.Router();

/**
 * create a service request. For now, the location is a string
 * the request body should contain 3 fields:
 * {
 *     typeService: string,
 *     reason: string,
 *     nodeLoc: string
 * }
 */
serviceRouter.post("/", async (req: Request, res: Response) => {
  const serviceRequest: Prisma.ServiceRequestCreateInput = req.body;
  await insertServiceRequest(
    serviceRequest.typeService,
    serviceRequest.reason,
    serviceRequest.nodeLoc,
  );
  res.status(200).send("Successfully Inserted");
});
