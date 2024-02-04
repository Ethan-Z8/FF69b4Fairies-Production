import express, { Request, Response, Router } from "express";
import prisma from "../bin/database-connection.ts";
import { insertEmployee } from "database/src/Employee.ts";
import { Prisma } from "database";

const router: Router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const employee: Prisma.EmployeeCreateInput = req.body;
  await insertEmployee(
    employee.username,
    employee.password,
    employee.displayName,
  );
  res.status(200).send("Successfully Inserted Employee");
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.employee.findMany();
    res.json(data);
  } catch (e) {
    const error = e as Error;
    console.log(error);
    res.status(400).send("Failed to get Employee data");
  }
});
export default router;
