import express, { Request, Response, Router } from "express";
import Prisma from "../bin/database-connection.ts";
import Pathfinder from "../algorithms/Pathfinder.ts";
import MapNode, { MapNodeNoNeighbors } from "../algorithms/MapNode.ts";
import { Readable } from "stream";
import MapEdge from "../algorithms/MapEdge.ts";
import archiver from "archiver";
import multer from "multer";
import AlgoStrategyPattern from "../algorithms/AlgoStrategyPattern.ts";
import AStarAlgo from "../algorithms/AStarAlgo.ts";
import BFSAlgo from "../algorithms/BFSAlgo.ts";
import DFSAlgo from "../algorithms/DFSAlgo.ts";
export const mapRouter: Router = express.Router();
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

    // The Object.fromEntries converts the graph (which is a HashMap) to an object literal, so it can be sent
    res.json(Object.fromEntries(MapNode.connectNodes(nodes, edges)));
  } catch (e) {
    res.status(400).send("GET map failed");
  }
});

mapRouter.get("/allTemp", async (_: Request, res: Response) => {
  try {
    console.log("running allTemp");
    const nodeCache: Set<MapNodeNoNeighbors> = new Set();
    const edgeCache: Set<MapEdge> = new Set();
    const nodes = await Prisma.mapNode.findMany();
    const edges = await Prisma.mapEdge.findMany();
    nodes.forEach((node) => nodeCache.add(node));
    edges.forEach((edge) => edgeCache.add(edge));
    const pathFindingGraph = new Pathfinder(nodes, edges);
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
  try {
    const endpoints = req.query as StartAndEndNodes;
    const nodes = await Prisma.mapNode.findMany();
    const edges = await Prisma.mapEdge.findMany();
    const pathFindingGraph = new Pathfinder(nodes, edges);
    const shortestPath: string[] = pathFindingGraph.findShortestPath(
      endpoints.start,
      endpoints.end,
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
  } catch (e) {
    console.log(e);
    res.sendStatus(402);
  }
});

mapRouter.get("/pathNodes", async (req: Request, res: Response) => {
  try {
    type StartAndEndNodes = {
      start?: string;
      end?: string;
    };
    const endpoints = req.query as StartAndEndNodes;
    const nodes = await Prisma.mapNode.findMany();
    const edges = await Prisma.mapEdge.findMany();
    const pathFindingGraph = new Pathfinder(nodes, edges);

    const shortestPathNodes: Map<string, MapNode> =
      pathFindingGraph.findShortestPathNodes(endpoints.start!, endpoints.end!);

    if (shortestPathNodes.size === 0) {
      res.status(400).json({
        error:
          "One of your nodes is not in the database, or a path couldn't be found",
      });
    } else {
      res.status(200).json(Object.fromEntries(shortestPathNodes));
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

mapRouter.get("/pathNodesShort", async (req: Request, res: Response) => {
  try {
    type StartAndEndNodes = {
      start?: string;
      end?: string;
      algo?: string;
    };
    let strategyPattern: AlgoStrategyPattern = new AStarAlgo();
    const endpoints = req.query as StartAndEndNodes;
    console.log(endpoints.algo);
    if (endpoints.algo === "BFS") {
      strategyPattern = new BFSAlgo();
    } else if (endpoints.algo == "DFS") {
      strategyPattern = new DFSAlgo();
    }

    const nodes = await Prisma.mapNode.findMany();
    const edges = await Prisma.mapEdge.findMany();
    const pathFindingGraph = new Pathfinder(nodes, edges, strategyPattern);

    const startNodeId = pathFindingGraph.shortNameToID(endpoints.start!);
    const endNodeId = pathFindingGraph.shortNameToID(endpoints.end!);

    if (!startNodeId || !endNodeId) {
      res.status(400).json({
        error: "One of your nodes is not in the database",
      });
      return;
    }

    const shortestPathNodes: Map<string, MapNode> =
      pathFindingGraph.findShortestPathNodes(startNodeId, endNodeId);

    if (shortestPathNodes.size === 0) {
      res.status(400).json({
        error: "A path couldn't be found between the specified nodes",
      });
    } else {
      res.status(200).json(Object.fromEntries(shortestPathNodes));
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

mapRouter.get("/id", async (req: Request, res: Response) => {
  try {
    type ID = {
      id?: string;
    };
    const node = req.query as ID;
    const nodes = await Prisma.mapNode.findMany();
    const edges = await Prisma.mapEdge.findMany();
    const pathFindingGraph = new Pathfinder(nodes, edges);
    let found: MapNode;
    const foundNode = pathFindingGraph.getNodeByID(node.id!);
    if (foundNode !== undefined) {
      found = foundNode;
      res.status(200).json(found);
    } else {
      res.status(400).json({
        error: "This node is not in the database",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
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

/**
 * Takes 2 csv files, one names "nodes", and one named "edges", and inserts them into the database
 *
 *
 */
mapRouter.post(
  "/import",
  upload.fields([
    { name: "nodes", maxCount: 1 },
    { name: "edges", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    // Use Multer to get the files
    // Bro what is this typecasting
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const nodesFile = files["nodes"] as Express.Multer.File[];
    const edgesFile: Express.Multer.File[] = files["edges"];

    try {
      // Parse the input files into Map Nodes and Map Edges
      const nodesWithNeighbors = MapNode.csvStringToNodes(
        nodesFile[0].buffer.toString(),
      );
      const nodes: MapNodeNoNeighbors[] =
        MapNode.dropNeighbors(nodesWithNeighbors);

      const edges: MapEdge[] = MapEdge.csvStringToEdges(
        edgesFile[0].buffer.toString(),
      );

      // Insert all the provided map nodes and edges, but silently ignore duplicates
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
      const typedError = e as Error;
      console.log(typedError.message);
      res.sendStatus(401);
    }
  },
);

mapRouter.get("/edges", async (req: Request, res: Response) => {
  try {
    const edges = await Prisma.mapEdge.findMany();
    res.status(200).json(edges);
  } catch (e) {
    const message = (e as Error).message;
    console.log(message);
    res.sendStatus(400);
  }
});
