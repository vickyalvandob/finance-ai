import { Request, Response } from "express"
import { HTTPSTATUS } from "../config/http.config"
import { asyncHandler } from "../middlewares/asyncHandler.middleware"
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginService, registerService } from "../services/auth.service";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);

    const result  = await registerService(body);

    return res
      .status(HTTPSTATUS.CREATED)
      .json({message: "User registered successfully", data: result});
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);

    const result  = await loginService(body);

    return res
      .status(HTTPSTATUS.CREATED)
      .json({message: "User login successfully", data: result});
  }
);