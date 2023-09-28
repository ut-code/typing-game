import Router from "express";
import { postTypingSessionHandler } from "../controllers/typingSessionControllers";

const router = Router();

router.post("/", postTypingSessionHandler);

export default router;
