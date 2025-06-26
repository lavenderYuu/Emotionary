import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        user_id : {
            type: String,
            // type: mongoose.Types.ObjectId,
            // ref: "User",
            required: true,
        }
    }
)

const Tag = model("Tag", TagSchema, "tag");

export { Tag };