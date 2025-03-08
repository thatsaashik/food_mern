import mongoose from "mongoose";
const mongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aashiik:aashik1234@cluster0.leiq6.mongodb.net/aashik?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

   
  const db = mongoose.connection.db;

  // Fetch food data
  const foodCollection = db.collection("food");
  const foodData = await foodCollection.find({}).toArray();

  // Fetch category data
  const categoryCollection = db.collection("Category_food");
  const categoryData = await categoryCollection.find({}).toArray();

  // Assign to global variables
  global.food = foodData;
  global.food_category = categoryData;

//   console.log("Fetched Data:", { food: global.food, categories: global.food_category });
} catch (err) {
  console.error("Error connecting to MongoDB or fetching data:", err);
}

}
export default mongodb;
