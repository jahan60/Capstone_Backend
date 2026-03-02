import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectionStr = process.env.MONGO_URI || "";

async function connectDB(){
    try{
        await mongoose.connect(connectionStr);

        console.log("MongoDB connected....");
 }catch (err){
    console.error({error: `❌ Error: ${err.message}`})
    process.exit(1);

}
}

export default connectDB;