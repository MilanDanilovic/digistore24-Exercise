import { Router } from "express";
import { fetchMessages, postMessage } from "../controllers/messageController";
import authenticate from "../middleware/authMiddleware";

const router = Router();

router.get("/messages", fetchMessages);
router.post("/message", authenticate, postMessage);

export default router;
