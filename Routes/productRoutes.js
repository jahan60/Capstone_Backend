import express from "express"
import Product from "../Models/productSchema.js";
import { createProduct, getProducts, getProductById } from "../Controllers/productController.js";

const router = express.Router();

//<...../api/products.....>
router.route("/")
.post(createProduct)
.get(getProducts);

//<..... /api/products/:id.....>
router.route("/:id")
.get(getProductById)



export default router;
