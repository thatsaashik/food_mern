import express from "express";
import mongodb from "./db.js";
import UserRouter from "./Routes/UserRouter.js";
import DisplayData from "./Routes/DisplayData.js"
import Oderdata from "./Routes/Oderdata.js"
import cors from "cors";


mongodb();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// Routes
app.use("/api", UserRouter);
app.use("/api", DisplayData);
app.use("/api", Oderdata)

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port number ${PORT}`);
});
