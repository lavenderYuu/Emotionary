import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import sinon from "sinon";
import { expect } from "chai";
import { app } from "../server.js";
import { Entry } from "../models/entry.model.js";
import dayjs from "dayjs";
import { Tag } from "../models/tag.model.js";

// mongodb-memory-server for db testing: https://typegoose.github.io/mongodb-memory-server/docs/guides/quick-start-guide/#choose-the-right-package
// supertest for api testing: https://www.npmjs.com/package/supertest, https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/

let mongod;

describe("Entry Tests", function () {
  this.timeout(15000);

  before(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    sinon.stub(console, "error"); // Silence console.error during tests
  });

  after(async function () {
    await mongoose.disconnect();
    await mongod.stop();
    console.error.restore(); // Restore console.error after tests
  });

  // GET /users/:userId/entries
  it("should fetch all active entries of specified user", async () => {
    const user1 = new mongoose.Types.ObjectId();
    const user2 = new mongoose.Types.ObjectId();

    await Entry.create([
      {
        title: "Title 1",
        date: "2025-06-01",
        content: "Content 1",
        content_iv: "dummy_iv_1",
        tags: [],
        favorite: false,
        user_id: user1,
        mood: "😊",
      },
      {
        title: "Title 2",
        date: "2025-06-02",
        content: "Content 2",
        content_iv: "dummy_iv_2",
        tags: [],
        favorite: true,
        user_id: user1,
        mood: "😭",
      },
      {
        title: "Title 3",
        date: "2025-06-03",
        content: "Content 3",
        content_iv: "dummy_iv_3",
        tags: [],
        favorite: false,
        user_id: user2,
        mood: "😭",
      },
      {
        title: "Title 3",
        date: "2025-06-03",
        content: "Content 3",
        content_iv: "dummy_iv_3",
        tags: [],
        favorite: false,
        user_id: user1,
        mood: "😭",
        deleted: true,
        deletedAt: new Date(),
      },
    ]);

    const response1 = await request(app).get(`/users/${user1}/entries`);
    expect(response1.statusCode).to.equal(200);
    expect(response1.body).to.be.an("array").with.lengthOf(2);
    expect(response1.body[0].title).to.equal("Title 2");
    expect(response1.body[1].title).to.equal("Title 1");
    expect(response1.body[0].content_iv).to.equal("dummy_iv_2");
    expect(response1.body[1].content_iv).to.equal("dummy_iv_1");

    const response2 = await request(app).get(`/users/${user2}/entries`);
    expect(response2.statusCode).to.equal(200);
    expect(response2.body).to.be.an("array").with.lengthOf(1);
    expect(response2.body[0].title).to.equal("Title 3");
    expect(response2.body[0].content_iv).to.equal("dummy_iv_3");
  });

  // GET /entries/:entryId
  it("should fetch a specified entry", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entries = await Entry.create([
      {
        title: "Title 1",
        date: "2025-06-01",
        content: "Content 1",
        content_iv: "dummy_iv_1",
        tags: [],
        favorite: false,
        user_id: user1,
        mood: "😊",
      },
      {
        title: "Title 2",
        date: "2025-06-02",
        content: "Content 2",
        content_iv: "dummy_iv_2",
        tags: [],
        favorite: true,
        user_id: user1,
        mood: "😭",
      },
    ]);

    const entryId = entries[0]._id;
    const response = await request(app).get(`/entries/${entryId}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.content_iv).to.equal("dummy_iv_1");
    expect(response.body.tags).to.be.an("array").empty;
    expect(response.body.favorite).to.equal(false);
    expect(response.body.mood).to.equal("😊");
  });

  // POST /entries
  it("should create a new entry with tags", async function () {
    const user1 = new mongoose.Types.ObjectId();
    const tag1 = new mongoose.Types.ObjectId();
    const tag2 = new mongoose.Types.ObjectId();

    const entry = {
      title: "Title 1",
      date: "2025-06-01",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [tag1, tag2],
      favorite: false,
      user_id: user1,
      mood: "😊",
    };

    const response = await request(app).post("/entries").send(entry);

    expect(response.statusCode).to.equal(201);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.content_iv).to.equal("dummy_iv");
    expect(response.body.tags).to.be.an("array").with.lengthOf(2);
    expect(response.body.tags).to.include(tag1.toString());
    expect(response.body.tags).to.include(tag2.toString());
    expect(response.body.favorite).to.equal(false);
    expect(response.body.user_id).to.equal(user1.toString());
    expect(response.body.mood).to.equal("😊");
  });

  // POST /entries
  it("should create a new entry with no tags", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = {
      title: "Title 1",
      date: "2025-06-01",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [],
      favorite: false,
      user_id: user1,
      mood: "😊",
    };

    const response = await request(app).post("/entries").send(entry);

    expect(response.statusCode).to.equal(201);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.content_iv).to.equal("dummy_iv");
    expect(response.body.tags).to.be.an("array").with.lengthOf(0);
    expect(response.body.favorite).to.equal(false);
    expect(response.body.user_id).to.equal(user1.toString());
    expect(response.body.mood).to.equal("😊");
  });

  // POST /entries
  it("should fail to create a new entry with no title", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = {
      title: "",
      date: "2025-06-01",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [],
      favorite: false,
      user_id: user1,
      mood: "😊",
    };

    const response = await request(app).post("/entries").send(entry);

    expect(response.statusCode).to.equal(400);
    expect(response.body.error).to.equal("Failed to add entry");
  });

  // POST /entries
  it("should fail to create a new entry with no date", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = {
      title: "Title 1",
      date: "",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [],
      favorite: false,
      user_id: user1,
      mood: "😊",
    };

    const response = await request(app).post("/entries").send(entry);

    expect(response.statusCode).to.equal(400);
    expect(response.body.error).to.equal("Failed to add entry");
  });

  // POST /entries
  it("should fail to create a new entry with no content", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = {
      title: "Title 1",
      date: "2025-06-01",
      content: "",
      content_iv: "dummy_iv",
      tags: [],
      favorite: false,
      user_id: user1,
      mood: "😊",
    };

    const response = await request(app).post("/entries").send(entry);

    expect(response.statusCode).to.equal(400);
    expect(response.body.error).to.equal("Failed to add entry");
  });

  // POST /entries
  it("should fail to create a new entry with no content_iv", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = {
      title: "Title 1",
      date: "2025-06-01",
      content: "abcd",
      content_iv: "",
      tags: [],
      favorite: false,
      user_id: user1,
      mood: "😊",
    };

    const response = await request(app).post("/entries").send(entry);

    expect(response.statusCode).to.equal(400);
    expect(response.body.error).to.equal("Failed to add entry");
  });

  // POST /entries
  it("should fail to create a new entry with no mood", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = {
      title: "Title 1",
      date: "2025-06-01",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [],
      favorite: false,
      user_id: user1,
      mood: "",
    };

    const response = await request(app).post("/entries").send(entry);

    expect(response.statusCode).to.equal(400);
    expect(response.body.error).to.equal("Failed to add entry");
  });

  // PUT /entries/:entryId
  it("should update an entry's title, date, content, and tags", async function () {
    const user1 = new mongoose.Types.ObjectId();
    const tag1 = new mongoose.Types.ObjectId();
    const tag2 = new mongoose.Types.ObjectId();
    const updatedTag1 = new mongoose.Types.ObjectId();

    const entry = {
      title: "Title 1",
      date: "2025-06-01",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [tag1],
      favorite: false,
      user_id: user1,
      mood: "😊",
    };

    const createdEntry = await Entry.create(entry);
    const entryId = createdEntry._id;
    const response = await request(app)
      .put(`/entries/${entryId}`)
      .send({
        title: "Updated Title",
        date: "2025-06-02",
        content: "Updated Content",
        content_iv: "dummy_iv_new",
        tags: [updatedTag1, tag2],
      });

    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Updated Title");
    expect(response.body.date).to.equal("2025-06-02T00:00:00.000Z");
    expect(response.body.content).to.equal("Updated Content");
    expect(response.body.content_iv).to.equal("dummy_iv_new");
    expect(response.body.tags).to.be.an("array").with.lengthOf(2);
    expect(response.body.tags).to.not.include(tag1.toString());
    expect(response.body.tags).to.include(updatedTag1.toString());
    expect(response.body.tags).to.include(tag2.toString());
    expect(response.body.favorite).to.equal(false);
    expect(response.body.user_id).to.equal(user1.toString());
    expect(response.body.mood).to.equal("😊");
  });

  // PUT /entries/:entryId
  it("should update entry mood only", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = await Entry.create({
      title: "Title 1",
      date: "2025-06-01",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [],
      favorite: false,
      user_id: user1,
      mood: "😊",
    });

    const entryId = entry._id;
    const response = await request(app).put(`/entries/${entryId}`).send({
      mood: "😭",
    });
    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.content_iv).to.equal("dummy_iv");
    expect(response.body.tags).to.be.an("array").empty;
    expect(response.body.favorite).to.equal(false);
    expect(response.body.mood).to.equal("😭");
  });

  // PUT /entries/:entryId
  it("should toggle entry favorite only", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entry = await Entry.create({
      title: "Title 1",
      date: "2025-06-01",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [],
      favorite: false,
      user_id: user1,
      mood: "😊",
    });

    const entryId = entry._id;
    const response = await request(app).put(`/entries/${entryId}`).send({
      favorite: true,
    });
    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.content_iv).to.equal("dummy_iv");
    expect(response.body.tags).to.be.an("array").empty;
    expect(response.body.favorite).to.equal(true);
    expect(response.body.mood).to.equal("😊");
  });

  // PUT /entries/:entryId
  it("should not update an entry if no fields are provided", async function () {
    const user1 = new mongoose.Types.ObjectId();
    const tag1 = new mongoose.Types.ObjectId();
    const tag2 = new mongoose.Types.ObjectId();

    const entry = {
      title: "Title 1",
      date: "2025-06-01",
      content: "Content 1",
      content_iv: "dummy_iv",
      tags: [tag1, tag2],
      favorite: false,
      user_id: user1,
      mood: "😊",
    };

    const createdEntry = await Entry.create(entry);
    const entryId = createdEntry._id;
    const response = await request(app).put(`/entries/${entryId}`).send({}); // No fields provided

    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.content_iv).to.equal("dummy_iv");
    expect(response.body.tags).to.be.an("array").with.lengthOf(2);
    expect(response.body.tags).to.include(tag1.toString());
    expect(response.body.tags).to.include(tag2.toString());
    expect(response.body.favorite).to.equal(false);
    expect(response.body.user_id).to.equal(user1.toString());
    expect(response.body.mood).to.equal("😊");
  });

  // PUT /entries/:entryId
  it("should fail to update an entry with non-existent entryId", async function () {
    const entryId = new mongoose.Types.ObjectId(); // Non-existent entryId

    const response = await request(app).put(`/entries/${entryId}`).send({
      title: "Updated Title",
      date: "2025-06-02",
      content: "Updated Content",
      content_iv: "dummy_iv",
      tags: [],
    });
    expect(response.statusCode).to.equal(404);
    expect(response.body.error).to.equal("Entry not found");
  });

  // DELETE /entries/:entryId
  it("should delete a specified entry", async function () {
    const user1 = new mongoose.Types.ObjectId();

    const entries = await Entry.create([
      {
        title: "Title 1",
        date: "2025-06-01",
        content: "Content 1",
        content_iv: "dummy_iv_1",
        tags: [],
        favorite: false,
        user_id: user1,
        mood: "😊",
      },
      {
        title: "Title 2",
        date: "2025-06-02",
        content: "Content 2",
        content_iv: "dummy_iv_2",
        tags: [],
        favorite: true,
        user_id: user1,
        mood: "😭",
      },
    ]);

    const entryId = entries[0]._id;
    let response = await request(app).delete(`/entries/${entryId}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body.title).to.equal("Title 1");
    expect(response.body.date).to.equal("2025-06-01T00:00:00.000Z");
    expect(response.body.content).to.equal("Content 1");
    expect(response.body.content_iv).to.equal("dummy_iv_1");
    expect(response.body.tags).to.be.an("array").empty;
    expect(response.body.favorite).to.equal(false);
    expect(response.body.mood).to.equal("😊");

    response = await request(app).get(`/users/${user1}/entries`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("array").with.lengthOf(1);
    expect(response.body[0].title).to.equal("Title 2");
  });

  describe("Entry Filter Tests", () => {
    let user1;
    let tag1, tag2, tag3;

    beforeEach(async () => {
      user1 = new mongoose.Types.ObjectId();
      await Entry.deleteMany();
      await Tag.deleteMany();

      tag1 = await Tag.create({
        name: "Tag1",
        user_id: user1,
        colour: "#e992d5",
      });
      tag2 = await Tag.create({
        name: "Tag2",
        user_id: user1,
        colour: "#f0b7a4",
      });
      tag3 = await Tag.create({
        name: "Tag3",
        user_id: user1,
        colour: "#f0b7f4",
      });
      const entries = [
        {
          title: "Title 1",
          date: new Date("2025-06-01T07:00:00Z"), // PDT: June 1, 2025 12:00 AM (midnight)
          content: "Content 1",
          content_iv: "dummy_iv_1",
          tags: [tag1._id, tag2._id],
          favorite: false,
          user_id: user1,
          mood: "😊",
        },
        {
          title: "Title 2",
          date: new Date("2025-06-02T19:00:00Z"), // PDT: June 2, 2025 12:00 PM (noon)
          content: "Content 2",
          content_iv: "dummy_iv_2",
          tags: [tag2._id, tag3._id],
          favorite: true,
          user_id: user1,
          mood: "😭",
        },
        {
          title: "Title 3",
          date: new Date("2025-06-03T07:00:00Z"), // PDT: June 3, 2025 12:00 AM (midnight)
          content: "Content 3",
          content_iv: "dummy_iv_3",
          tags: [tag3._id],
          favorite: false,
          user_id: user1,
          mood: "😢",
        },
        {
          title: "Title 4",
          date: new Date("2025-06-05T02:00:00Z"), // PDT: June 4, 2025 7:00 PM (evening)
          content: "Content 4",
          content_iv: "dummy_iv_4",
          tags: [tag1._id, tag2._id, tag3._id],
          favorite: true,
          user_id: user1,
          mood: "😃",
        },
        {
          title: "Title 5",
          date: new Date("2025-06-05T02:00:00Z"), // PDT: June 4, 2025 7:00 PM (evening)
          content: "Content 5",
          content_iv: "dummy_iv_5",
          tags: [tag2._id],
          favorite: true,
          user_id: user1,
          mood: "😃",
          deleted: true,
          deletedAt: new Date("2025-06-05T02:05:00Z"),
        },
        {
          title: "Title 6",
          date: new Date("2025-06-01T07:00:00Z"), // PDT: June 1, 2025 12:00 AM (midnight)
          content: "Content 6",
          content_iv: "dummy_iv_6",
          tags: [],
          favorite: false,
          user_id: user1,
          mood: "😊",
          deleted: true,
          deletedAt: new Date("2025-06-03T07:00:00Z"),
        },
      ];

      await Entry.create(entries);
    });

    // GET /entries/filter/:userId
    it("should filter entries by tag", async function () {
      const filteredTag = tag1._id.toString();
      const response = await request(app).get(
        `/entries/filter/${user1}?tagId=${filteredTag}`
      );
      const entries = response.body.entries;
      expect(response.statusCode).to.equal(200);
      expect(entries).to.be.an("array").with.lengthOf(2);
      expect(entries[0].title).to.equal("Title 4");
      expect(entries[1].title).to.equal("Title 1");
      expect(response.body.totalEntries).to.equal(2);
    });

    it("should filter entries by date range", async function () {
      const startDate = dayjs(new Date("2025-06-03T00:00:00"))
        .startOf("day")
        .toDate()
        .toISOString();

      const endDate = dayjs(new Date("2025-06-04T00:00:00"))
        .add(1, "day")
        .startOf("day")
        .toDate()
        .toISOString();

      const response = await request(app).get(
        `/entries/filter/${user1}?startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}`
      );

      const entries = response.body.entries;
      expect(response.statusCode).to.equal(200);
      expect(entries).to.be.an("array").with.lengthOf(2);
      expect(entries[0].title).to.equal("Title 4");
      expect(entries[1].title).to.equal("Title 3");
      expect(response.body.totalEntries).to.equal(2);
      expect(response.body.totalPages).to.equal(1);
    });

    it("should filter entries by mood", async function () {
      const response = await request(app).get(
        `/entries/filter/${user1}?mood=😭`
      );
      const entries = response.body.entries;
      expect(response.statusCode).to.equal(200);
      expect(entries).to.be.an("array").with.lengthOf(1);
      expect(entries[0].title).to.equal("Title 2");
    });

    it("should filter entries by favorite status", async function () {
      const response = await request(app).get(
        `/entries/filter/${user1}?favorite=true`
      );
      const entries = response.body.entries;
      expect(response.statusCode).to.equal(200);
      expect(entries).to.be.an("array").with.lengthOf(2);
      expect(entries[0].title).to.equal("Title 4");
      expect(entries[1].title).to.equal("Title 2");
    });

    it("should filter entries by deleted status", async function () {
      const response = await request(app).get(
        `/entries/filter/${user1}?deleted=true`
      );
      const entries = response.body.entries;
      expect(response.statusCode).to.equal(200);
      expect(entries).to.be.an("array").with.lengthOf(2);
      expect(entries[0].title).to.equal("Title 5");
      expect(entries[1].title).to.equal("Title 6");
    });

    it("should filter entries by date range, mood, tag, favorite, and delete status", async function () {
      const startDate = dayjs(new Date("2025-06-02T00:00:00"))
        .startOf("day")
        .toDate()
        .toISOString();

      const endDate = dayjs(new Date("2025-06-04T00:00:00"))
        .add(1, "day")
        .startOf("day")
        .toDate()
        .toISOString();

      const response = await request(app).get(
        `/entries/filter/${user1}?startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}&mood=😢&tagId=${
          tag3._id
        }&favorite=false&delete=false`
      );

      const entries = response.body.entries;
      expect(response.statusCode).to.equal(200);
      expect(entries).to.be.an("array").with.lengthOf(1);
      expect(entries[0].title).to.equal("Title 3");
      expect(response.body.totalEntries).to.equal(1);
      expect(response.body.totalPages).to.equal(1);
    });

    it("should return an empty array if no entries match the filters", async function () {
      const response = await request(app).get(
        `/entries/filter/${user1}?startDate=2025-06-03&endDate=2025-05-04&mood=😢&favorite=false`
      );
      const entries = response.body.entries;
      expect(response.statusCode).to.equal(200);
      expect(entries).to.be.an("array").with.lengthOf(0);
      expect(response.body.totalEntries).to.equal(0);
      expect(response.body.totalPages).to.equal(0);
    });

    it("should return right pagination when filtering entries", async function () {
      const response = await request(app).get(
        `/entries/filter/${user1}?page=1&limit=2`
      );
      expect(response.statusCode).to.equal(200);
      expect(response.body.entries).to.be.an("array").with.lengthOf(2);
      expect(response.body.entries[0].title).to.equal("Title 4");
      expect(response.body.entries[1].title).to.equal("Title 3");
      expect(response.body.totalEntries).to.equal(4);
      expect(response.body.totalPages).to.equal(2);
      expect(response.body.currentPage).to.equal(1);

      const responsePage2 = await request(app).get(
        `/entries/filter/${user1}?page=2&limit=2`
      );
      expect(responsePage2.statusCode).to.equal(200);
      expect(responsePage2.body.entries).to.be.an("array").with.lengthOf(2);
      expect(responsePage2.body.entries[0].title).to.equal("Title 2");
      expect(responsePage2.body.entries[1].title).to.equal("Title 1");
      expect(responsePage2.body.totalEntries).to.equal(4);
      expect(responsePage2.body.totalPages).to.equal(2);
      expect(responsePage2.body.currentPage).to.equal(2);
    });
  });
});
