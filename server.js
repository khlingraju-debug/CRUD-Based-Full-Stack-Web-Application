import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shop");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", () => {
  console.log("MongoDB Connected");
});

const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

/* GET PRODUCTS */
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ADD PRODUCT */
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);

  await newProduct.save();

  res.json(newProduct);
});

/* UPDATE PRODUCT */
app.put("/products/:id", async (req, res) => {

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedProduct);
});

/* DELETE PRODUCT */
app.delete("/products/:id", async (req, res) => {

  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted Successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});