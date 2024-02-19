import express, { Request, Response, Router } from "express";
import prisma from "../bin/database-connection.ts";
import { Prisma } from "database";
import { Readable } from "stream";
import archiver from "archiver";
import EmployeeData from "../algorithms/Employee.ts";
import multer from "multer";

const router: Router = express.Router();
const upload = multer();

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

router.get("/export", async (_: Request, res: Response) => {
  function dataToCSVStream(data: Array<object>): Readable {
    const headers: string = Object.keys(data[0]).join(",") + "\n";
    const body: string = data
      .map((line) => Object.values(line).join(","))
      .join("\n");

    return Readable.from(headers + body);
  }

  try {
    // Read from the database and convert data to streams
    const employees: EmployeeData[] = await prisma.employee.findMany();
    // const nodes: MapNodeNoNeighbors[] = await Prisma.mapNode.findMany();
    // const edges: MapEdge[] = await Prisma.mapEdge.findMany();
    const employeesCSV: Readable = dataToCSVStream(employees);
    // const edgesCSV: Readable = dataToCSVStream(edges);

    // Create an archive of the streams(basically a zip file) and pipe it into the response
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });
    archive.append(employeesCSV, { name: "employees.csv" });
    // archive.append(edgesCSV, { name: "edges.csv" });

    // Tell the client that the response is a file named map_data.zip
    res.set({
      "Content-Type": "application/zip", // Set the appropriate content type
      "Content-Disposition": 'attachment; filename="employee_data.zip"', // Specify the filename
    });

    // Send the successful response
    await archive.finalize();
    archive.pipe(res);
    res.status(200);
  } catch (e) {
    res.status(401).send("could not export file");
    console.log(e);
  }
});

/**
 * Takes 2 csv files, one names "nodes", and one named "edges", and inserts them into the database
 *
 *
 */
router.post(
  "/import",
  upload.fields([
    { name: "employee", maxCount: 1 },
    // { name: "edges", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    // Use Multer to get the files
    // Bro what is this typecasting
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const employeesFile = files["employees"] as Express.Multer.File[];
    // const edgesFile: Express.Multer.File[] = files["edges"];

    try {
      // Parse the input files into Map Nodes and Map Edges
      const employees = EmployeeData.csvStringToEmp(
        employeesFile[0].buffer.toString(),
      );
      // const nodes: MapNodeNoNeighbors[] =
      //     MapNode.dropNeighbors(nodesWithNeighbors);

      // const edges: MapEdge[] = MapEdge.csvStringToEdges(
      //     edgesFile[0].buffer.toString(),
      // );

      // Insert all the provided map nodes and edges, but silently ignore duplicates
      await prisma.employee.createMany({
        data: employees,
        skipDuplicates: true,
      });
      // await Prisma.mapEdge.createMany({
      //     data: edges,
      //     skipDuplicates: true,
      // });
      res.sendStatus(200);
    } catch (e) {
      const typedError = e as Error;
      console.log(typedError.message);
      res.sendStatus(401);
    }
  },
);

export default router;
