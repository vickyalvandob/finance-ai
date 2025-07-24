import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http.config";

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Catch‑all route (fixed)
app.get('/', (req: Request, res: Response) => {
  res.status(HTTPSTATUS.OK).json({
    message: "Hello Subscribe to the channel",
  });
});

app.listen(Env.PORT, () => {
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
