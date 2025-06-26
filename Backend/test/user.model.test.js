import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { expect } from "chai";
import { User } from "../models/user.model.js";

describe("User Model", function () {
  before(async function () {
    await mongoose.connect("mongodb://localhost:27017/testdb");
  });

  after(async function () {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should hash the password when creating a new user", async function () {
    const plaintextPassword = "testpassword123";
    
    const user = new User({
      email: "testuser@email.com",
      password: plaintextPassword,
    });

    await user.save();

    expect(user.password).to.not.equal(plaintextPassword);
  });

  it("should correctly match the hashed and plaintext passwords", async function () {
    const plaintextPassword = "testpassword123";
    
    const user = new User({
      email: "test@email.com",
      password: plaintextPassword,
    });

    await user.save();

    const isPasswordMatch = await bcrypt.compare(plaintextPassword, user.password);
    expect(isPasswordMatch).to.be.true;
  });
});