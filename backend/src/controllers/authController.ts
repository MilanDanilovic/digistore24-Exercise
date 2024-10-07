import { Request, Response } from "express";
import { register, login } from "../services/authService";
import { signAccessToken, verifyRefreshToken } from "../utils/jwtUtils";
import { JwtPayload } from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const { accessToken, refreshToken } = await register(username, password);
    res.status(201).json({ username, accessToken, refreshToken });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const { accessToken, refreshToken } = await login(username, password);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const decoded = verifyRefreshToken(refreshToken) as JwtPayload;
    const newAccessToken = signAccessToken(decoded.user);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(400).json({ error: "Invalid refresh token" });
  }
};
