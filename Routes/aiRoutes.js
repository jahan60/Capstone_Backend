import express from "express";
import { predictStock, generateAlerts } from "../AI/aiController.js";

const router = express.Router();

router.post("/predict-stock", predictStock);
router.post("/generate-alerts", generateAlerts);

export default router;