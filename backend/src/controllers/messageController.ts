import { Request, Response } from "express";
import { getMessages, createMessage } from "../services/messageService";

export const fetchMessages = async (req: Request, res: Response) => {
  const messages = getMessages();
  res.status(200).json(messages);
};

export const postMessage = async (req: Request, res: Response) => {
  const { message, user } = req.body;

  try {
    const newMessage = createMessage(message, user);
    res.status(201).json(newMessage);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
