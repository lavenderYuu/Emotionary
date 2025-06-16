import express from 'express';
import entry from "./entry.js"
import tag from "./tag.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from Node API");
});

router.post("/product", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

router.use('/entries', entry);
router.use('/tags', tag);

export { router };