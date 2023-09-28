import Router from "express";
import { getRankingHandler } from "../controllers/rankingControllers";

const router = Router();

router.get("/", getRankingHandler);

export default router;
