import OpenAI from "openai";
import Product from "../Models/productSchema.js";
import Stock from "../Models/stockSchema.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  //configuring the function with API key.
});

// Ask OpenAI
async function askAI(prompt) {
  const response = await client.chat.completions.create({    //pre-built openai method
    model: "gpt-4o-mini",                                    // call the OpenAI chat completions API using GPT-40 model
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content; //return thr AI's text response
}

// Predict stock for a single product
export const predictStock = async (req, res) => {            //controller function
  try {
    const { productId } = req.body;                           //Extract product id from the request body
    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    const product = await Product.findOne({ sku: productId });    //Find the product in the database using its sku
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const history = await Stock.find({ ProductId: productId }).sort({ createdAt: 1 });  //Fetch all stock movements for this product.
                                                                                       //sort oldest to newest. for the prompt includes product info and stock history, prediction instructins.
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

    // convert the AI response into json 
    try {
      prediction = JSON.parse(prediction);
    } catch (err) {
      console.warn("AI did not return valid JSON. Returning raw text.");
    }

    res.json({ productId, prediction });  //send the final prediction to the frontend

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate alerts for all products
export const generateAlerts = async (req, res) => {    //controller function
  try {
    const products = await Product.find();   //fetch all products from the database
    const stock = await Stock.find();        //fetch all stock history records.

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