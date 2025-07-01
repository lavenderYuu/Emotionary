import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import sinon from "sinon";
import { expect } from "chai";
import { app } from "../server.js";
import bcrypt from "bcrypt";

let mongod;

describe("User Tests", function () {
  before(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    sinon.stub(console, "error");
  });

  after(async function () {
    await mongoose.disconnect();
    await mongod.stop();
    console.error.restore();
  });

  // POST /users/register
  it("should create a new user", async function () {
    const plaintextPassword = "password123";
    const userData = {
      email: "Bob@gmail.com",
      password: plaintextPassword,
      name: "Bob",
    };

    const res = await request(app).post("/users/register").send(userData);

    const user = res.body.user;

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property(
      "message",
      "User registered successfully"
    );
    expect(user).to.have.property("email", userData.email);
    expect(user).to.have.property("name", userData.name);
    expect(user.password).to.not.equal(plaintextPassword);
  });

  it("should not create a user with an existing email", async function () {
    const plaintextPassword = "password123";
    const userData = {
      email: "Bob@gmail.com",
      password: plaintextPassword,
      name: "Bob",
    };
    const res = await request(app).post("/users/register").send(userData);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "User already exists");
  });

  it("should not create a user with invalid email format", async function () {
    const plaintextPassword = "password123";
    const userData = {
      email: "invalid-email",
      password: plaintextPassword,
      name: "Bob",
    };
    const res = await request(app).post("/users/register").send(userData);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Invalid email format. Example: user@example.com"
    );
  });

  it("should not create a user with password less than 8 characters", async function () {
    const userData = {
      email: "Adam@gmail.com",
      password: "short",
      name: "Adam",
    };
    const res = await request(app).post("/users/register").send(userData);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Password must be at least 8 characters long"
    );
  });

    // POST /users/login
  it("should log in an existing user", async function () {
    const plaintextPassword = "password123";
    const userData = {
      email: "Bob@gmail.com",
      password: plaintextPassword,
      name: "Bob",
    };
    const res = await request(app).post("/users/login").send(userData);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Login successful");
    expect(res.body.user).to.have.property("email", userData.email);
    expect(res.body.user).to.have.property("name", userData.name);
    expect(bcrypt.compareSync(plaintextPassword, res.body.user.password)).to.be
      .true;
  });

  it("should not log in with incorrect password", async function () {
    const userData = {
      email: "Bob@gmail.com",
      password: "wrongpassword",
      name: "Bob",
    };
    const res = await request(app).post("/users/login").send(userData);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("message", "Wrong password");
  });

  it("should not log in with non-existent user", async function () {
    const userData = {
      email: "Adam@outlook.com",
      password: "password123",
      name: "Adam",
    };
    const res = await request(app).post("/users/login").send(userData);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("message", "Invalid email");
  });
});
