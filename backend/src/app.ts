import cors from "cors";
import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import connectDB from "./config/db";

const app: Express = express();

app.use(cors());

app.use(express.json());

connectDB();


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", userRoutes);

app.use("/api/auth", authRoutes);

export default app;
