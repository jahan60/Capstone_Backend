import express from "express";
import { logReq, globalErr} from "./Middlewares/middleware.js";
import { protect } from "./Middlewares/authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/conn.js";
import mongoose from "mongoose";
import productRoutes from "./Routes/productRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import stockRoutes from "./Routes/stockRoutes.js";
import alertRoutes from "./Routes/alertRoutes.js";
import Product from "./Models/productSchema.js";
import Alert from "./Models/alertSchema.js";
import Stock from "./Models/stockSchema.js";
import User from "./Models/userSchema.js";
import aiRoutes from "./Routes/aiRoutes.js";
import cors from "cors"
import authRoutes from "./Routes/authRoutes.js";

//Setups
const app = express();

const PORT = process.env.PORT || 3000;
connectDB();

//check indexes for Product
const indexes = await Product.listIndexes();
console.log("product Indexes:", indexes)

//check indexes for Alert
const alertIndexes = await Alert.listIndexes();
console.log("Alert Indexes:", alertIndexes);

//check indexes for Stcok 
const stockIndexes = await Stock.listIndexes();
  console.log("Stock Indexes:", stockIndexes);

  //check indexes for users 
  const userIndexes = await User.listIndexes();
  console.log("User Indexes:", userIndexes);

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(logReq);

// Public route (NO protect here)
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/products", protect, productRoutes);
app.use("/api/stock", protect, stockRoutes);
app.use("/api/alerts", protect, alertRoutes);
app.use("/api/users", protect, userRoutes);
app.use("/api/ai", protect, aiRoutes);


//Global Err Handling
app.use(globalErr);

//Listener
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT: ${PORT}`)
});