import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserDocument, User } from "../models/User";
import { JWT_SECRET } from "../utils/secrets";

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserDocument | null;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const { id } = jwt.verify(token, JWT_SECRET!) as UserPayload;
    const user = await User.findById(id);
    if (user) {
      req.currentUser = user;
    }
  } catch (error) {}
  next();
};
