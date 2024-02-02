import express, { Request, Response, Router } from "express";
// import PrismaClient from "../bin/database-connection.ts";
import { insertServiceRequest } from "database/src/Requests.ts";
// import { Prisma } from "database";

export const serviceRouter: Router = express.Router();

serviceRouter.post("/", async (req: Request, res: Response) => {
  const serviceRequest = req.body;
  console.log(serviceRequest);
  await insertServiceRequest(1234, "Bob");
  res.status(200).send("Successfully Inserted");
});
