import Router from "express";
import { getPerformanceSummaryHandler } from "../controllers/performanceSummaryControllers.js";

const router = Router();

router.get("/:id", getPerformanceSummaryHandler);

export default router;
