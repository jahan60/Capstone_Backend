import express from "express";
import { createStock, getStockByProductId } from "../Controllers/stockController.js";

const router = express.Router();

//   /api/stock
router.route("/")
  .post(createStock);

//  /api/stock/:productId
router.route("/:productId")
  .get(getStockByProductId);

export default router;
