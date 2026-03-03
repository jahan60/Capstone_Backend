import express from "express"
import Product from "../Models/productSchema.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../Controllers/productController.js";

const router = express.Router();

//...../api/products.....
router.route("/")
.post(createProduct) //Create Product
.get(getProducts);   //Get products

//..... /api/products/:id.....
router.route("/:id")
.get(getProductById)//get pruduct by id
.put(updateProduct)  //update product by id 
.delete(deleteProduct) //delete product by id



export default router;
