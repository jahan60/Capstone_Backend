import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
    {
       Id: {
        type: String,
        required: true,
        unique: true
       },

       ProductId:{
        type: String,
        require: true
       },

       ChangeType:{
        type: String,
        require: true,
        enum: ["increase", "decrease"]
       },

       Amount: {
        type: Number,
        required: true,
        min: 1
       }
    },
    { timestamps: true}
);
//indexes 
stockSchema.index({ ProductId: 1 });
stockSchema.index({ ChangeType: 1 });
stockSchema.index({ ProductId: 1, ChangeType: 1 }); 


export default mongoose.model("Stock", stockSchema)






