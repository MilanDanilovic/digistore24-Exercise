import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../utils/jwtUtils";

const users: { username: string; password: string }[] = [];

export const register = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  const accessToken = signAccessToken(username);
  const refreshToken = signRefreshToken(username);

  return { username, accessToken, refreshToken };
};

export const login = async (username: string, password: string) => {
  const user = users.find((u) => u.username === username);
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid credentials");

  const accessToken = signAccessToken(user.username);
  const refreshToken = signRefreshToken(user.username);

  return { accessToken, refreshToken };
};
