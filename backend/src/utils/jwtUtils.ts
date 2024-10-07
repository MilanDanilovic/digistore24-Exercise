import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signAccessToken = (user: string) => {
  return jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const signRefreshToken = (user: string) => {
  return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
  } catch (error) {
    throw new Error("Invalid Refresh Token");
  }
};
