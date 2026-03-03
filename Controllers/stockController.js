
import Stock from "../Models/stockSchema.js";

// Add a new stock entry
const createStock = async (req, res) => {
  try {
    const { Id, ProductId, ChangeType, Amount } = req.body;

    const stock = await Stock.create({
      Id,
      ProductId,
      ChangeType,
      Amount
    });

    res.status(201).json({
      message: "Stock entry created successfully",
      stock
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export { createStock, getStockByProductId };