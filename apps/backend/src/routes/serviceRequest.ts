import express, { Request, Response, Router } from "express";
import prisma from "../bin/database-connection.ts";
import { insertServiceRequest } from "database/src/Requests.ts";
import { Prisma } from "database";

const router: Router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const serviceRequest: Prisma.ServiceRequestCreateInput = req.body;
  // const serviceRequest = req.body as Prisma.ServiceRequestCreateManyInput[];
  //     await insertServiceRequest(serviceRequest);
  //     prisma.serviceRequest.createMany({
  //         data: serviceRequest,
  //         skipDuplicates: true
  //     }).then(() => res.status(200)).catch(() => res.status(400));
  // });for(request : Service)

  // let employees = ["jon", "Monty"];
  // for(let i= 0; i<employees.length; i++) {
  //     const employeeInput: { connect: { displayName: string } } = {
  //         connect: {
  //             displayName: employees[i],
  //         },
  //     };

  try {
    // Fetch all employee display names from the database
    const employees = await prisma.employee.findMany({
      select: {
        displayName: true,
      },
    });
    const employeeDisplayNames: string[] = employees.map(
      (employee) => employee.displayName,
    );
    for (const displayName of employeeDisplayNames) {
      const employeeInput: { connect: { displayName: string } } = {
        connect: {
          displayName,
        },
      };

      await insertServiceRequest(
        serviceRequest.typeService,
        serviceRequest.reason,
        serviceRequest.nodeLoc,
        serviceRequest.progress,
        employeeInput,
      );
      res.status(200).send("Successfully Inserted");
    }
  } catch (e) {
    console.error("Error creating service requests:", e);
    res.status(500).send("Internal Server Error");
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

export default router;
