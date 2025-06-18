import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MoodSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        }
    }
)

const Mood = model("Mood", MoodSchema, "mood");

export { Mood };