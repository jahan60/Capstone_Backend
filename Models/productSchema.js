import mongoose from "mongoose";
const productSchema = new mongoose.Schema(

    {
        name:{
          type: String,
          required: true
         },

         sku: {
            type: String, 
            required: true,
            unique: true
         },

         category: {
            type: String,
            required: true
         },

         quantity: {
            type: Number,
            required: true
         },

         minQuantity: {
            type: Number,
            required: true
         },

         price: {
            type: Number,
            required: true
         }
      },
      { timestamps: true }
);
//indexes
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ category:1, price: -1});


export default mongoose.model("Product", productSchema);