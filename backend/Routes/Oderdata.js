import express from "express";
import Order from "../models/OderSchema.js";

const router = express.Router();

router.post('/orderData', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging

    // Ensure order_data is valid and not empty
    if (!req.body.order_data || req.body.order_data.length === 0) {
      return res.status(400).json({ success: false, message: "Empty order data!" });
    }

    let orderData = req.body.order_data.length > 0 
    ? [{ Order_date: req.body.order_date }, ...req.body.order_data] 
    : []; 
  

    let existingOrder = await Order.findOne({ email: req.body.email });

    if (!existingOrder) {
      await Order.create({
        email: req.body.email,
        order_data: [orderData],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: orderData } }
      );
    }
    return res.json({ success: true });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});


router.post("/MyOrder", async (req, res) => {
  try {
    let mydata = await Order.findOne({ email: req.body.email });

    if (!mydata || !mydata.order_data) {
      return res.json({ orderData: [] }); // Return empty array if no valid order data
    }

    // Remove empty order_data entries
    let filteredOrders = mydata.order_data.filter(order => order.length > 1);

    res.json({ orderData: filteredOrders });
  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});


export default router;
