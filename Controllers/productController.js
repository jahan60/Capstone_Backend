import Product from "../Models/productSchema.js"

const createProduct = async (req, res) =>{
    try{
        const { name, sku, category, quantity, minQuantity, price } = req.body;

        const product = await Product.create({
            name,
            sku,
            category,
            quantity,
            minQuantity,
            price
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    }catch (error){
        res.status(400).json({ error: error.message });
    }
};

//Get all products
const getProducts = async (req, res)=> {
    try{
        const products = await Product.find();

        res.status(200).json(products);
    }catch (error){
        res.status(400).json({ error: error.message })
    }
};

//Get product by id

const getProductById = async (req, res)=> {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({ error: "product not found" });
        } 
        res.status(200).json(product);
    } catch (error){
        res.status(400).json({ error: error.message })
    }
};

//Update product
const updateProduct = async(req, res)=>{
    try{
         const updatedProduct = await Product.findByIdAndUpdate(
             req.params.id,
             req.body,
             { new: true, runValidators: true}
             );
             if (!updatedProduct){
                return res.status(404).json({ error: "Product not found" })
           }

           res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
           });
    }catch (error){
        res.status(400).json({ error: error.message})
    }
};

//Delete Product
const deleteProduct = async(req, res)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id,
            req.body,
              { new: true, runValidators: true}
        );  
        if(!deletedProduct){
                return res.status(404).json({ error: "Product not found" })
           }

           res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
           });
    }catch (error){
        res.status(400).json({ error: error.message})
    }

}



export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };