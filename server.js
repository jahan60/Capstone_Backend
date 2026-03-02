import express from "express";
import { logReq, globalErr } from "./Middlewares/middleware.js";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import mongoose from "mongoose";
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

//Global Err Handling
app.use(globalErr);

//Listener
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT: ${PORT}`)
});