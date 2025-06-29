import mongoose from 'mongoose';
import { app } from './server.js';

// connects to db

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
