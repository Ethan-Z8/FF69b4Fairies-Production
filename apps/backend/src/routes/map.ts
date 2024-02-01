import express, { Request, Response, Router } from "express";
import PrismaClient from "../bin/database-connection.ts";
import Pathfinder from "../algorithms/Pathfinder.ts";

type StartAndEndNodes = {
  start?: string;
  end?: string;
};

const router: Router = express.Router();
let pathFindingGraph: Pathfinder;

/**
 * Gets the entire map. Grabs the nodes and edges from the database, then connects them
 *
 * No request body needed
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const nodes = await PrismaClient.mapNode.findMany();
    const edges = await PrismaClient.mapEdge.findMany();
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
router.get("/path", async (req, res) => {
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
export default router;
