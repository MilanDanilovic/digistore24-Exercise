import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticate = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" }); // Return Response, but no need to return void
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = decoded;
    next(); // Proceed with the next middleware
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticate;
