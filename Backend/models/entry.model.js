import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EntrySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        content_iv: {
            type: String,
            required: true,
        },
        
        tags: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Tag"
                }
            ],
        },

        favorite: {
            type: Boolean,
            default: false,
        },

        user_id : {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },

        mood: {
            type: String,
            required: true,
        },

        deleted: {
            type: Boolean,
            default: false,
        },
        
        deletedAt: {
            type: Date,
            default: null,
        }
    }
)

const Entry = model("Entry", EntrySchema, "entry");

export { Entry };