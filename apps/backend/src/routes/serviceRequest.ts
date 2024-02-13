import express, { Request, Response, Router } from "express";
import prisma from "../bin/database-connection.ts";
import { Prisma } from "database";

const router: Router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const sr = req.body as Prisma.ServiceRequestCreateManyInput;
  try {
    const parent = await prisma.serviceRequest.create({
      data: {
        employee: sr.employee,
        location: sr.location,
        priority: sr.priority,
        progress: sr.progress,
        typeService: sr.typeService,
      },
    });

    switch (sr.typeService) {
      case "Sanitation":
        await prisma.sanitationRequest.createMany({
          data: {
            hazardous: req.body.hazardous,
            messDesc: req.body.messDesc,
            id: parent.id,
          },
        });
        break;
      case "Religious":
        await prisma.religionRequest.createMany({
          data: {
            religionType: req.body.religionType,
            typeOfService: req.body.typeOfService,
            id: parent.id,
          },
        });
        break;
      case "Flowers":
        await prisma.flowerRequest.createMany({
          data: {
            flowerType: req.body.flowerType,
            recipient: req.body.recipient,
            id: parent.id,
          },
        });
        break;
      case "Maintenance":
        await prisma.maintenanceRequest.createMany({
          data: {
            personnelNeeded: req.body.personnelNeeded,
            issueType: req.body.issueType,
            id: parent.id,
          },
        });
        break;
      case "Transportation":
        await prisma.transportationRequest.createMany({
          data: {
            endLocation: req.body.endLocation,
            equipmentNeeded: req.body.equipmentNeeded,
            id: parent.id,
          },
        });
        break;
      default:
        throw new Error("No Request Type Provided");
    }
    res.sendStatus(200);
  } catch (e) {
    const message = (e as Error).message;
    console.log(message);
    res.sendStatus(400).json({ message });
  }
});

/**
 * Gets all the service requests from the database
 */

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.serviceRequest.findMany({
      include: {
        flowerRequest: true,
        maintenanceRequest: true,
        religionRequest: true,
        sanitationRequest: true,
        transportationRequest: true,
      },
    });
    res.status(200).json(data);
  } catch (e) {
    const typedError = e as Error;
    console.log(typedError.message);
    res.status(400).send("Error in getting service requests");
  }
});

router.post("/updateProgress", async (req: Request, res: Response) => {
  type update = {
    id: number;
    progress: "Assigned" | "InProgress" | "Completed";
  };
  const updateData = req.body as update;
  try {
    await prisma.serviceRequest.update({
      where: { id: updateData.id },
      data: { progress: updateData.progress },
    });
    res.sendStatus(200);
  } catch (e) {
    console.log((e as Error).message);
    res.sendStatus(400);
  }
});
export default router;
