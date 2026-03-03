import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
     Id: {
      type: String,
      required: true,
      unique: true
    },

    Name: {
      type: String,
      required: true,
      trim: true
    },

    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    
    Password: {
      type: String,
      required: true
    },

    Role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user"
    }
},

{ timestamps: true }

);
export default mongoose.model("User", userSchema)