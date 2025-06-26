import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

mongoose
  .connect(
    "mongodb+srv://slack:emotionary@emotionary.qhnktaq.mongodb.net/emotionarydb?retryWrites=true&w=majority&appName=Emotionary"
  )
  .then(() => {
    console.log("Connected to db!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  });
