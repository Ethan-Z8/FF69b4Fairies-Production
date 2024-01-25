import express, { Request, Response, Router } from "express";
import PrismaClient from "../bin/database-connection.ts";
import MapNode from "../algorithms/MapNode.ts";

const router: Router = express.Router();

/**
 * Gets the entire map. Grabs the nodes and edges from the database, then connects them
 *
 * No request body needed
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const nodes = await PrismaClient.mapNode.findMany();
    const edges = await PrismaClient.mapEdge.findMany();
    const graph = MapNode.connectNodes(nodes, edges);

    // The Object.fromEntries converts the graph (which is a HashMap) to an object literal, so it can be sent
    res.json(Object.fromEntries(graph));
  } catch (e) {
    res.status(400).send("GET map failed");
  }
});

export default router;
