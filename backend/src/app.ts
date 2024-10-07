import cors from "cors";
import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import flashcardRoutes from "./routes/flashcardRoutes";
import connectDB from "./config/db";

const app: Express = express();

app.use(cors());

app.use(express.json());

connectDB();

// logga inkommande requests för felsökning/testning
app.use((req, res, next) => {
  console.log(`Request received at ${req.path}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/collections", flashcardRoutes);

export default app;
