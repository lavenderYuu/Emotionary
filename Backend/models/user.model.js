import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: "Anonymous",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password should be at least 8 characters long"],
  },

  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entry",
    },
  ],
});

const User = model("User", UserSchema);

export { User };