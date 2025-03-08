import express, { json } from "express";
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    // console.log("Food:", global.food);
    // console.log("Category:", global.food_category);
    res.send([global.food, global.food_category]);
  } catch (error) {
    console.error("Error in /foodData route:", error.message);
    res.status(500).send("Server error");
  }
});


export default router;