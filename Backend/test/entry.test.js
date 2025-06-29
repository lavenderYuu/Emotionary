import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { expect } from "chai";
import { app } from "../server.js";
import { Entry } from "../models/entry.model.js";

// mongodb-memory-server for db testing: https://typegoose.github.io/mongodb-memory-server/docs/guides/quick-start-guide/#choose-the-right-package
// supertest for api testing: https://www.npmjs.com/package/supertest, https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/

let mongod;

describe("Entry Tests", function () {
  before(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  after(async function () {
    await mongoose.disconnect();
    await mongod.stop();
  });

  // GET /users/:userId/entries
  it("should fetch all entries of specified user", async () => {
    const user1 = new mongoose.Types.ObjectId();
    const user2 = new mongoose.Types.ObjectId();

    await Entry.create([
      { title: "Title 1", date: "2025-06-01", content: "Content 1", tags: [], favorite: false, user_id: user1, mood: "😊" },
      { title: "Title 2", date: "2025-06-02", content: "Content 2", tags: [], favorite: true, user_id: user1, mood: "😭" },
      { title: "Title 3", date: "2025-06-03", content: "Content 3", tags: [], favorite: false, user_id: user2, mood: "😭" },
    ]);

    const response1 = await request(app).get(`/users/${user1}/entries`);
    expect(response1.statusCode).to.equal(200);
    expect(response1.body).to.be.an("array").with.lengthOf(2);
    expect(response1.body[0].title).to.equal("Title 2");
    expect(response1.body[1].title).to.equal("Title 1");

    const response2 = await request(app).get(`/users/${user2}/entries`);
    expect(response2.statusCode).to.equal(200);
    expect(response2.body).to.be.an("array").with.lengthOf(1);
    expect(response2.body[0].title).to.equal("Title 3");
  });

  // GET /entries/entryId
  it("should fetch a specified entry", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entries = await Entry.create([
      { title: "Title 1", date: "2025-06-01", content: "Content 1", tags: [], favorite: false, user_id: user1, mood: "😊" },
      { title: "Title 2", date: "2025-06-02", content: "Content 2", tags: [], favorite: true, user_id: user1, mood: "😭" },
    ]);

    const entryId = entries[0]._id; 
    const response = await request(app).get(`/entries/${entryId}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.tags).to.be.an("array").empty;
    expect(response.body.favorite).to.equal(false);
    expect(response.body.mood).to.equal("😊");
  });

  // PUT /entries/:entryId
  it("should update entry mood only", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = await Entry.create(
      { title: "Title 1", date: "2025-06-01", content: "Content 1", tags: [], favorite: false, user_id: user1, mood: "😊" },
    );

    const entryId = entry._id; 
    const response = await request(app)
      .put(`/entries/${entryId}`)
      .send({
        mood: "😭"
      })
    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.tags).to.be.an("array").empty;
    expect(response.body.favorite).to.equal(false);
    expect(response.body.mood).to.equal("😭");
  });

  // PUT /entries/:entryId
  it("should toggle entry favorite only", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = await Entry.create(
      { title: "Title 1", date: "2025-06-01", content: "Content 1", tags: [], favorite: false, user_id: user1, mood: "😊" },
    );

    const entryId = entry._id; 
    const response = await request(app)
      .put(`/entries/${entryId}`)
      .send({
        favorite: true
      })
    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.tags).to.be.an("array").empty;
    expect(response.body.favorite).to.equal(true);
    expect(response.body.mood).to.equal("😊");
  });

    // DELETE /entries/:entryId
  it("should delete a specified entry", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entries = await Entry.create([
      { title: "Title 1", date: "2025-06-01", content: "Content 1", tags: [], favorite: false, user_id: user1, mood: "😊" },
      { title: "Title 2", date: "2025-06-02", content: "Content 2", tags: [], favorite: true, user_id: user1, mood: "😭" },
    ]);

    const entryId = entries[0]._id; 
    let response = await request(app).delete(`/entries/${entryId}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.tags).to.be.an("array").empty;
    expect(response.body.favorite).to.equal(false);
    expect(response.body.mood).to.equal("😊");

    response = await request(app).get(`/users/${user1}/entries`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("array").with.lengthOf(1);
    expect(response.body[0].title).to.equal("Title 2");
  });
});