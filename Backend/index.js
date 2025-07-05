import mongoose from 'mongoose';
import { app } from './server.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); 
// connects to db

mongoose
  .connect(
    process.env.MONGODB_ID
  )
  .then(() => {
    console.log("Connected to db!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  });
