import express from "express";
// This will help us connect to the database
import db from "../db/connection.js";

const router = express.Router();
// This section will help you get a list of all the records.

router.get("/", async (req, res) => {
  try {
    const collection = db.collection("product");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});

export default router;
