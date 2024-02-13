import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import exampleRouter from "./routes/example.ts";
import { mapRouter } from "./routes/map.ts";
import serviceRouter from "./routes/serviceRequest.ts";
import employeeRouter from "./routes/employee.ts";
import { auth } from "express-oauth2-jwt-bearer";

const app: Express = express(); // Setup the backend

// Setup generic middleware
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP request
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// eslint-disable-next-line @typescript-eslint/ban-types
function enableCors(req: Request, res: Response, next: Function) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow all methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow headers

  if (req.method === "OPTIONS") {
    res.sendStatus(200); // Respond to preflight requests
  } else {
    next();
  }
}

app.use(enableCors);

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/api/high-score", exampleRouter);
app.use("/api/map", mapRouter);
app.use("/api/serviceRequest", serviceRouter);
app.use("/api/employee", employeeRouter);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});
app.use("/healthcheck", function (req: Request, res: Response): void {
  if (!process.env["VITETEST"]) {
    app.use(
      auth({
        audience: "/api",
        issuerBaseURL: "https://dev-y3oolmq2fczbeey6.us.auth0.com/",
        tokenSigningAlg: "RS256",
      }),
    );
  }
  res.sendStatus(200);
});
export default app; // Export the backend, so that www.ts can start it
