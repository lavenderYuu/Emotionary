import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import db from "./db/connection.js"; 

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", records);

app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});


app.get("/", (req, res) => {
  res.send("API is running");
});