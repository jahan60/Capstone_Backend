import OpenAI from "openai";
import Product from "../Models/productSchema.js";
import Stock from "../Models/stockSchema.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Ask OpenAI
async function askAI(prompt) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
}

// Predict stock for a single product
export const predictStock = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    const product = await Product.findOne({ sku: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const history = await Stock.find({ ProductId: productId }).sort({ createdAt: 1 });

    const prompt = `
      You are an AI inventory analyst.
      Analyze this product and its stock history.

      Product:
      Name: ${product.name}
      Category: ${product.category}
      Quantity: ${product.quantity}
      Min Quantity: ${product.minQuantity}
      Price: ${product.price}

      Stock Movements:
      ${history.map(h => `${h.ChangeType} ${h.Amount} on ${h.createdAt}`).join("\n")}

      Predict:
      - When stock will run out
      - How much to reorder
      - Demand trend for next month
      - Any risks or unusual patterns

      Return the prediction in JSON format with fields:
      {
        "runOutInDays": number,
        "reorderAmount": number,
        "nextMonthDemand": number,
        "risks": string
      }
    `;

    let prediction = await askAI(prompt);

    // Try to parse JSON safely
    try {
      prediction = JSON.parse(prediction);
    } catch (err) {
      console.warn("AI did not return valid JSON. Returning raw text.");
    }

    res.json({ productId, prediction });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate alerts for all products
export const generateAlerts = async (req, res) => {
  try {
    const products = await Product.find();
    const stock = await Stock.find();

    const prompt = `
      You are an AI alert system.
      Analyze inventory and stock history.

      Products:
      ${products.map(p => `${p.sku} - ${p.name} - Qty: ${p.quantity}`).join("\n")}

      Stock History:
      ${stock.map(s => `${s.ProductId} - ${s.ChangeType}: ${s.Amount}`).join("\n")}

      Generate alerts for:
      - Low stock
      - Out of stock
      - Predicted shortages
      - Unusual demand spikes

      Return the alerts as a list of short bullet points.
    `;

    const alerts = await askAI(prompt);
    res.json({ alerts });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};