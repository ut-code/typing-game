import Router from "express";
import { postTypingSessionHandler } from "../controllers/typingSessionControllers.js";

const router = Router();

router.post("/", postTypingSessionHandler);

export default router;
