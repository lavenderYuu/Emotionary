import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import sinon from "sinon";
import { expect } from "chai";
import { app } from "../server.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";

let mongod;
let clientStub;

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

  describe("User Google Tests", () => {
    before(() => {
      clientStub = sinon.stub(OAuth2Client.prototype, "verifyIdToken");
    });

    beforeEach(() => {
      clientStub.reset();
    });

    after(() => {
      clientStub.restore();
    });

    // POST /users/google-auth
    it("should log in a Google user with verified id token", async function () {
      const idToken = "verifiedToken";
      const payload = {
        name: "Test Name",
        email: "test@gmail.com",
        sub: "googleId123",
      };
      const firstName = payload.name.split(" ")[0];

      clientStub.returns(Promise.resolve({
        getPayload: () => payload
      }));

      const res = await request(app).post("/users/google-auth").send({ idToken });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Login successful");
      expect(res.body.user).to.have.property("email", payload.email);
      expect(res.body.user).to.have.property("name", firstName);
      expect(res.body.user).to.have.property("googleId", payload.sub);

      const user = await User.findById(res.body.user._id);
      expect(user).to.exist;
      expect(user.email).to.equal(payload.email);
      expect(user.name).to.equal(firstName);
      expect(user.googleId).to.equal(payload.sub);
      expect(user.password).to.not.exist;
    });

    it("should not log in a Google user with unverified id token", async function () {
      const idToken = "unverifiedToken";
      const payload = {
        name: "Test Name",
        email: "test@gmail.com",
        sub: "googleId123",
      };

      clientStub.returns(Promise.reject({
        getPayload: () => payload
      }));

      const res = await request(app).post("/users/google-auth").send({ idToken });
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message", "Invalid Google ID token");
    });
  
  });
});
