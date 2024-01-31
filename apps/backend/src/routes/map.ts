import express, { Request, Response, Router } from "express";
import Prisma from "../bin/database-connection.ts";
import Pathfinder from "../algorithms/Pathfinder.ts";
import { MapNodeNoNeighbors } from "../algorithms/MapNode.ts";
import MapEdge from "../algorithms/MapEdge.ts";
import archiver from "archiver";
import MapNode from "../algorithms/MapNode.ts";

export const mapRouter: Router = express.Router();
let pathFindingGraph: Pathfinder;

/**
 * Gets the entire map. Grabs the nodes and edges from the database, then connects them
 *
 * No request body needed
 */
mapRouter.get("/", async (req: Request, res: Response) => {
  try {
    const nodes = await Prisma.mapNode.findMany();
    const edges = await Prisma.mapEdge.findMany();
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
    start?: string;
    end?: string;
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

mapRouter.get("/pathNodes", async (req: Request, res: Response) => {
  try {
    type StartAndEndNodes = {
      start?: string;
      end?: string;
    };
    const endpoints = req.query as StartAndEndNodes;
    const shortestPathNodes: Map<string, MapNode> =
      pathFindingGraph.findShortestPathNodes(endpoints.start!, endpoints.end!);

    if (shortestPathNodes.size === 0) {
      res.status(400).json({
        error:
          "One of your nodes is not in the database, or a path couldn't be found",
      });
    } else {
      // Convert the Map values to an array for response

      // You can customize the response as needed
      res.status(200).json(Object.fromEntries(shortestPathNodes));
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

/**
 * Endpoint to get all the nodes and edges in the database and export them as a zip file
 */
mapRouter.get("/export", async (req: Request, res: Response) => {
  function dataToCSVBuffer(data: Array<object>): Buffer {
    const headers: string = Object.keys(data[0]).join(",") + "\n";
    const body: string = data
      .map((line) => Object.values(line).join(","))
      .join("\n");

    return Buffer.from(headers + body);
  }

  try {
    // Read from the database and convert data to buffers
    const nodes: MapNodeNoNeighbors[] = await Prisma.mapNode.findMany();
    const edges: MapEdge[] = await Prisma.mapEdge.findMany();
    const nodesCSV: Buffer = dataToCSVBuffer(nodes);
    const edgesCSV: Buffer = dataToCSVBuffer(edges);

    // Create an archive of the buffers (basically a zip file) and pipe it into the response
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });
    archive.append(nodesCSV, { name: "nodes.csv" });
    archive.append(edgesCSV, { name: "edges.csv" });
    archive.pipe(res);

    // Tell the client that the response is a file named map_data.zip
    res.set({
      "Content-Type": "application/zip", // Set the appropriate content type
      "Content-Disposition": 'attachment; filename="map_data.zip"', // Specify the filename
    });

    // Send the successful response
    await archive.finalize();
    res.send(200);
  } catch (e) {
    res.status(401).send("could not export file");
  }
});
