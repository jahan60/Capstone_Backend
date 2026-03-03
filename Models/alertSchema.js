import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      required: true,
      unique: true
    },

    ProductId: {
      type: String,
      required: true
    },

    AlertType: {
      type: String,
      required: true,
      enum: ["low-stock", "out-of-stock", "restock", "info"]
    },

    Message: {
      type: String,
      required: true,
      trim: true
    },

    Status: {
      type: String,
      required: true,
      enum: ["active", "resolved"],
      default: "active"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);