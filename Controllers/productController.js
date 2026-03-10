import Product from "../Models/productSchema.js";

//create product
const createProduct = async (req, res) => {
  try {
    const { name, sku, category, quantity, minQuantity, price } = req.body;

    const product = await Product.create({
      name,
      sku,
      category,
      quantity,
      minQuantity,
      price
    });

    // Ensure numbers are returned as actual numbers
    const formatted = {
      ...product._doc,
      quantity: Number(product.quantity),
      minQuantity: Number(product.minQuantity),
      price: Number(product.price)
    };

    res.status(201).json({
      message: "Product created successfully",
      product: formatted
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Convert all numeric fields to real numbers
    const formatted = products.map(p => ({
      ...p._doc,
      quantity: Number(p.quantity),
      minQuantity: Number(p.minQuantity),
      price: Number(p.price)
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 //get by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Format numeric fields
    const formatted = {
      ...product._doc,
      quantity: Number(product.quantity),
      minQuantity: Number(product.minQuantity),
      price: Number(product.price)
    };

    res.status(200).json(formatted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// controllers/productController.js
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Update product in DB
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true } // important: return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Make sure numbers are numbers
    const formatted = {
      ...updatedProduct._doc,
      quantity: Number(updatedProduct.quantity),
      minQuantity: Number(updatedProduct.minQuantity),
      price: Number(updatedProduct.price)
    };

    res.status(200).json({
      message: "Product updated successfully",
      product: formatted
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



//delete
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Format numeric fields
    const formatted = {
      ...deletedProduct._doc,
      quantity: Number(deletedProduct.quantity),
      minQuantity: Number(deletedProduct.minQuantity),
      price: Number(deletedProduct.price)
    };

    res.status(200).json({
      message: "Product deleted successfully",
      product: formatted
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};