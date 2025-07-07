import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    required: function() { return !this.googleId; },
    minlength: [12, "Password should be at least 12 characters long"],
  },

  googleId: {
    type: String,
    unique: true,
    required: false,
  },

  setupComplete: {
    type: Boolean,
    required: function() { return this.googleId; },
  },

  verifyPasskey_content: {
    type: String,
    required: false,
  },

  verifyPasskey_iv: {
    type: String,
    required: false,
  }
});

// Hash password before User document is saved
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  }

  next();  
});

const User = model("User", UserSchema);

export { User };