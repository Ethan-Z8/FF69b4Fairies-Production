import express, { Request, Response, Router } from "express";
import Prisma from "../bin/database-connection.ts";
import Pathfinder from "../algorithms/Pathfinder.ts";
import MapNode, { MapNodeNoNeighbors } from "../algorithms/MapNode.ts";
import { Readable } from "stream";
import MapEdge from "../algorithms/MapEdge.ts";
import archiver from "archiver";
import multer from "multer";

export const mapRouter: Router = express.Router();
let pathFindingGraph: Pathfinder;
const nodeCache: Set<MapNodeNoNeighbors> = new Set();
const edgeCache: Set<MapEdge> = new Set();
const upload = multer();

/**
 * Gets the entire map. Grabs the nodes and edges from the database, then connects them
 *
 * No request body needed
 */
mapRouter.get("/", async (_: Request, res: Response) => {
  try {
    const nodes = await Prisma.mapNode.findMany();
    const edges = await Prisma.mapEdge.findMany();
    nodes.forEach((node) => nodeCache.add(node));
    edges.forEach((edge) => edgeCache.add(edge));

    pathFindingGraph = new Pathfinder(nodes, edges);

    // The Object.fromEntries converts the graph (which is a HashMap) to an object literal, so it can be sent
    res.json(Object.fromEntries(pathFindingGraph.getNodes()));
  } catch (e) {
    res.status(400).send("GET map failed");
  }
});

/**
 * Gets the shortest path between two nodes
 *
 * The points are formatted at start=point1 and end=point2 in the request parameters
 */
mapRouter.get("/path", async (req, res) => {
  type StartAndEndNodes = {
    start: string;
    end: string;
  };
  const endpoints = req.query as StartAndEndNodes;
  const shortestPath: string[] = pathFindingGraph.findShortestPath(
    endpoints.start!,
    endpoints.end!,
  );
  if (shortestPath.length == 0) {
    res
      .status(400)
      .send(
        "one of your nodes is not in the database, or a path couldn't be found",
      );
  } else {
    res.status(200).send(shortestPath);
  }
});

/**
 * Endpoint to get all the nodes and edges in the database and export them as a zip file
 */
mapRouter.get("/export", async (_: Request, res: Response) => {
  function dataToCSVStream(data: Array<object>): Readable {
    const headers: string = Object.keys(data[0]).join(",") + "\n";
    const body: string = data
      .map((line) => Object.values(line).join(","))
      .join("\n");

    return Readable.from(headers + body);
  }

  try {
    // Read from the database and convert data to streams
    const nodes: MapNodeNoNeighbors[] = await Prisma.mapNode.findMany();
    const edges: MapEdge[] = await Prisma.mapEdge.findMany();
    const nodesCSV: Readable = dataToCSVStream(nodes);
    const edgesCSV: Readable = dataToCSVStream(edges);

    // Create an archive of the streams(basically a zip file) and pipe it into the response
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });
    archive.append(nodesCSV, { name: "nodes.csv" });
    archive.append(edgesCSV, { name: "edges.csv" });

    // Tell the client that the response is a file named map_data.zip
    res.set({
      "Content-Type": "application/zip", // Set the appropriate content type
      "Content-Disposition": 'attachment; filename="map_data.zip"', // Specify the filename
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

mapRouter.post(
  "/import",
  upload.array("csvFiles", 2),
  async (req: Request, res: Response) => {
    // Use Multer to get the files
    const files = req.files as Express.Multer.File[];

    // Parse the input files into Map Nodes and Map Edges
    const nodesWithNeighbors = MapNode.csvStringToNodes(
      files[0].buffer.toString(),
    );
    const nodes: MapNodeNoNeighbors[] =
      MapNode.dropNeighbors(nodesWithNeighbors);
    const edges: MapEdge[] = MapEdge.csvStringToEdges(
      files[1].buffer.toString(),
    );

    // Insert all the provided map nodes and edges, but silently ignore duplicates
    try {
      await Prisma.mapNode.createMany({
        data: nodes,
        skipDuplicates: true,
      });
      await Prisma.mapEdge.createMany({
        data: edges,
        skipDuplicates: true,
      });
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  },
);
