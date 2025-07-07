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
    const plaintextPassword = "password1234";
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
    const plaintextPassword = "password1234";
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
    const plaintextPassword = "password1234";
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

  it("should not create a user with password less than 12 characters", async function () {
    const userData = {
      email: "Adam@gmail.com",
      password: "short",
      name: "Adam",
    };
    const res = await request(app).post("/users/register").send(userData);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Password must be at least 12 characters long"
    );
  });

  // POST /users/login
  it("should log in an existing user", async function () {
    const plaintextPassword = "password1234";
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

  // PUT /users/complete-onboarding
  it("should mark onboarding true for user who completed onboarding", async function () {
    const user = new User({
        name: "User",
        email: "user@example1.com",
        password: "password1234",
    });

    await user.save();

    let res = await request(app).put("/users/complete-onboarding").send({ userId: user._id});
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Marking onboarded as complete");
    
    res = await request(app).post("/users/login").send({
      email: user.email,
      password: "password1234",
    });
    expect(res.status).to.equal(200);
    expect(res.body.user).to.have.property("onboarded", "completed");
  });

  it("should not log in with non-existent user", async function () {
    const userData = {
      email: "Adam@outlook.com",
      password: "password1234",
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

    // PUT /users/complete-setup
    it("should mark setupComplete true for existing user", async function () {
      const user = new User({
          name: "User",
          email: "user@gmail.com",
          googleId: "googleId1234",
          setupComplete: false,
          verifyPasskey_content: "encrypted_verified_string",
          verifyPasskey_iv: "dummy_iv"
      });

      await user.save();

      let res = await request(app).put("/users/complete-setup").send({
        userId: user._id,
        verifyPasskey_content: user.verifyPasskey_content,
        verifyPasskey_iv: user.verifyPasskey_iv,
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Marking setup as complete");
      
      const idToken = "verifiedToken";
      const payload = {
        name: user.name,
        email: user.email,
        sub: user.googleId
      };

      clientStub.returns(Promise.resolve({
        getPayload: () => payload
      }));

      res = await request(app).post("/users/google-auth").send({ idToken });
      expect(res.status).to.equal(200);
      expect(res.body.user).to.have.property("setupComplete", true);
    });

    describe("verifyPasskey", function () {
      let user;

      beforeEach(async function () {
        user = new User({
          name: "User 1",
          email: "user@example.com",
          googleId: "googleId12345",
          setupComplete: true,
          verifyPasskey_content: "encrypted_verified_string",
          verifyPasskey_iv: "dummy_iv"
        });

        await user.save();
      });

      afterEach(async function () {
        await User.deleteMany({});
      });

      // GET /users/verify-passkey/:userId
      it("should return the user's passkey verification data if the user exists", async function () {
        const res = await request(app).get(`/users/verify-passkey/${user._id}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("iv", "dummy_iv");
        expect(res.body).to.have.property("content", "encrypted_verified_string");
      });

      // GET /users/verify-passkey/:userId
      it("should return a 404 error if the user does not exist", async function () {
        const wrongId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/users/verify-passkey/${wrongId}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error", "User not found");
      });
    });
  });
});
