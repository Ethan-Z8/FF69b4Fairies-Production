import express, { Request, Response, Router } from "express";
import prisma from "../bin/database-connection.ts";
import { Prisma } from "database";

const router: Router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const employee: Prisma.EmployeeCreateInput = req.body;
  try {
    await prisma.employee.createMany({
      data: [
        {
          ...employee,
        },
      ],
    });
    res.status(200).send("Successfully Inserted Employee");
  } catch (e) {
    console.log((e as Error).message);
    res.status(400).send("Duplicate Key");
  }
});

router.delete("/delete", async (req: Request, res: Response) => {
  const { username } = req.body as { username: string };
  try {
    await prisma.employee.delete({
      where: {
        username,
      },
    });
    res.sendStatus(200);
  } catch (e) {
    console.log((e as Error).message);
    res.sendStatus(400);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.employee.findMany({
      orderBy: {
        username: "asc",
      },
    });
    res.json(data);
  } catch (e) {
    const error = e as Error;
    console.log(error);
    res.status(400).send("Failed to get Employee data");
  }
});

router.post("/update/displayName", async (req: Request, res: Response) => {
  type update = {
    username: string;
    displayName: string;
  };

  const updateData = req.body as update;
  console.log(updateData.username);
  console.log(updateData.displayName);
  try {
    await prisma.employee.update({
      where: { username: updateData.username },
      data: { displayName: updateData.displayName },
    });

    res.sendStatus(200);
  } catch (e) {
    console.log((e as Error).message);
    res.sendStatus(400);
  }
});

export default router;
