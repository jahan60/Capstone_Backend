import express from "express";
import { logReq, globalErr } from "./Middlewares/middleware.js";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import mongoose from "mongoose";
import productRoutes from "./Routes/productRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import stockRoutes from "./Routes/stockRoutes.js";
//Setups
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();

//Middleware
app.use(express.json());

//Logging middleware
app.use(logReq);

//Routes
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);
//app.use("/api/alerts", alertRoutes);
app.use("/api/users", userRoutes);
//app.use("/api/analytics", analyticsRoutes);

//Global Err Handling
app.use(globalErr);

//Listener
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT: ${PORT}`)
});