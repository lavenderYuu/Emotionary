import mongoose from "mongoose";
const { Schema, model } = mongoose;

// TEMPLATE
const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
        },

        quantity: {
            type: Number,
            required: true,
            default:0
        },

        price : {
            type: Number,
            required: true,
            default:0
        },
    }
)

const Product = model("Product", ProductSchema);

export { Product };