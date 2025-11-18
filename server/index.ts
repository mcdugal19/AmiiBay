// This is the Web Server
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import Stripe from "stripe";

// Import your API router and DB client (assuming they are also in /src)
import apiRouter from "./api";
import { client } from "./db";

const server = express();

// Enable Stripe - ensure SECRET_KEY is in your .env
const stripe = new Stripe(process.env.SECRET_KEY!);

// Middleware setup
server.use(cors()); // Enable cross-origin resource sharing
server.use(morgan("dev")); // Log everything
server.use(cookieParser(process.env.COOKIE_SECRET)); // Parse cookies
server.use(express.json()); // Handle application/json requests

// Serve static files from the React build directory
server.use(express.static(path.join(__dirname, "..", "build")));

// API routes
server.use("/api", apiRouter);

// Fallback: serve the React app for any unrecognized routes
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Custom error handling middleware
interface AppError extends Error {
  name: string;
  message: string;
  table?: string;
}

server.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

// Server startup
const PORT = process.env.PORT || 5433;
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);
  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

// Export for testing purposes
export { server, handle };