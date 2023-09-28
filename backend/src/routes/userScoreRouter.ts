import Router from "express";
import { getScoreHandler } from "../controllers/scoreControllers";

const router = Router();

router.get("/:id", getScoreHandler);

export default router;
