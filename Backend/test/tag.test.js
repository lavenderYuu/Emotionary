import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import sinon from "sinon";
import { expect } from "chai";
import { app } from "../server.js";
import { Tag } from "../models/tag.model.js";
import { Entry } from "../models/entry.model.js";

let mongod;

describe("Tag Tests", function () {
    this.timeout(5000);

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

    beforeEach(async () => {
        await Tag.deleteMany();
    });

    // GET /tags
    it("should fetch all tags", async function () {
        const user1 = new mongoose.Types.ObjectId();
        const user2 = new mongoose.Types.ObjectId();

        await Tag.create([
            { name: "Tag 1", user_id: user1, colour: "#e992d5" },
            { name: "Tag 2", user_id: user1, colour: "#b8a7ff" },
            { name: "Tag 3", user_id: user2, colour: "#e992d5" },
        ]);

        const response = await request(app).get('/tags');
        expect(response.body).to.be.an("array").with.lengthOf(3);

        const names = response.body.map(tag => tag.name).sort();
        expect(names).to.deep.equal(["Tag 1", "Tag 2", "Tag 3"]);
    });

    // GET /tags/:userId
    it("should fetch all tags of given user", async function () {
        const user1 = new mongoose.Types.ObjectId();
        const user2 = new mongoose.Types.ObjectId();

        await Tag.create([
            { name: "Tag 1", user_id: user1, colour: "#e992d5" },
            { name: "Tag 2", user_id: user1, colour: "#b8a7ff" },
            { name: "Tag 3", user_id: user2, colour: "#e992d5" },
        ]);

        const response1 = await request(app).get(`/tags/${user1}`);
        expect(response1.body).to.be.an("array").with.lengthOf(2);
        expect(response1.body[0].name).to.equal("Tag 1");
        expect(response1.body[1].name).to.equal("Tag 2");

        const response2 = await request(app).get(`/tags/${user2}`);
        expect(response2.body).to.be.an("array").with.lengthOf(1);
        expect(response2.body[0].name).to.equal("Tag 3");
    });

    // POST /tags
    it("should create a new tag", async function () {
        const user = new mongoose.Types.ObjectId();

        const tag = {
            name: "Tag 1",
            user_id: user,
            colour: "#e992d5"
        }

        const response = await request(app).post("/tags").send(tag);

        expect(response.statusCode).to.equal(201);
        expect(response.body.name).to.equal("Tag 1");
        expect(response.body.user_id).to.equal(user.toString());
        expect(response.body.colour).to.equal("#e992d5");
    });

    // POST /tags
    it("should fail to create a new tag with no tag name", async function () {
        const user = new mongoose.Types.ObjectId();

        const tag = {
            name: "",
            user_id: user,
            colour: "#e992d5"
        }

        const response = await request(app).post("/tags").send(tag);

        expect(response.statusCode).to.equal(404);
        expect(response.body.message).to.equal('Missing required field(s) for tag creation');
    });

    // POST /tags
    it("should fail to create a new tag with tag name already existing", async function () {
        const user1 = new mongoose.Types.ObjectId();

        await Tag.create([
            { name: "Tag 1", user_id: user1, colour: "#e992d5" },
            { name: "Tag 2", user_id: user1, colour: "#b8a7ff" },
        ]);

        const tag = {
            name: "Tag 1",
            user_id: user1,
            colour: "d5a6bc"
        }

        let response = await request(app).post("/tags").send(tag);

        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal("Tag name already exists");
        response = await request(app).get(`/tags/${user1}`);
        expect(response.body).to.be.an("array").with.lengthOf(2);

    });

    // POST /tags
    it("should fail to create a new tag with tag limit of 10 reached", async function () {
        const user1 = new mongoose.Types.ObjectId();

        await Tag.create([
            { name: "Tag 1", user_id: user1, colour: "#e992d5" },
            { name: "Tag 2", user_id: user1, colour: "#b8a7ff" },
            { name: "Tag 3", user_id: user1, colour: "#7dda92" },
            { name: "Tag 4", user_id: user1, colour: "#c8bff7" },
            { name: "Tag 5", user_id: user1, colour: "#ffe599" },
            { name: "Tag 6", user_id: user1, colour: "#5eaeff" },
            { name: "Tag 7", user_id: user1, colour: "#ffbde9" },
            { name: "Tag 8", user_id: user1, colour: "#04c589" },
            { name: "Tag 9", user_id: user1, colour: "#f2aa3e" },
            { name: "Tag 10", user_id: user1, colour: "#d5a6bd" },
        ]);

        const tag = {
            name: "Tag 11",
            user_id: user1,
            colour: "d5a6bc"
        }

        let response = await request(app).post("/tags").send(tag);
        expect(response.statusCode).to.equal(400);
        expect(response.body.message).to.equal("Maximum tag limit reached");
        response = await request(app).get(`/tags/${user1}`);
        expect(response.body).to.be.an("array").with.lengthOf(10);

    });

    // PUT /tags/:tagId
    it("should update a tag's name", async function () {
        const user = new mongoose.Types.ObjectId();

        const tag = {
            name: "Tag 1",
            user_id: user,
            colour: "#e992d5"
        }

        const tagObject = await Tag.create(tag);
        const tagId = tagObject._id;

        const response = await request(app).put(`/tags/${tagId}`).send({
            name: "New Tag Name"
        });

        expect(response.body.name).to.equal("New Tag Name");
        expect(response.body.user_id).to.equal(user.toString());
        expect(response.body.colour).to.equal("#e992d5");
    });

    // PUT /tags/:tagId
    it("should fail to update a tag with invalid tagId", async function () {
        const tagId = new mongoose.Types.ObjectId();

        const response = await request(app).put(`/tags/${tagId}`).send({
            name: "New Tag Name"
        });

        expect(response.statusCode).to.equal(404);
        expect(response.body.error).to.equal('tag not found');
    });

    // PUT /tags/:tagId
    it("should fail to update a tag with tag name already existing", async function () {
        const user1 = new mongoose.Types.ObjectId();

        await Tag.create([
            { name: "Tag 1", user_id: user1, colour: "#e992d5" },
            { name: "Tag 2", user_id: user1, colour: "#b8a7ff" },
        ]);

        const tag = {
            name: "Tag 3",
            user_id: user1,
            colour: "#e992d7"
        }

        const tagObject = await Tag.create(tag);
        const tagId = tagObject._id;

        let response = await request(app).put(`/tags/${tagId}`).send({
            name: "Tag 1"
        });

        expect(response.statusCode).to.equal(400);
        expect(response.body.error).to.equal('tag name already exists for this user');
    });

    // DELETE /tags/:tagId
    it("should delete given tag", async function () {
        const user = new mongoose.Types.ObjectId();

        const tags = await Tag.create([
            { name: "Tag 1", user_id: user, colour: "#e992d5" },
            { name: "Tag 2", user_id: user, colour: "#b8a7ff" },
        ]);

        const tagId = tags[0]._id;

        let response = await request(app).delete(`/tags/${tagId}`);
        expect(response.body.name).to.equal("Tag 1");
        expect(response.body.user_id).to.equal(user.toString());
        expect(response.body.colour).to.equal("#e992d5");

        response = await request(app).get(`/tags/${user}`);
        expect(response.body).to.be.an("array").with.lengthOf(1);
        expect(response.body[0].name).to.equal("Tag 2");
    });

    it("should delete a tag and remove it from all entries", async function () {
        const user = new mongoose.Types.ObjectId();

        const tags = await Tag.create([
            { name: "Tag 1", user_id: user, colour: "#e992d5" },
            { name: "Tag 2", user_id: user, colour: "#b8a7ff" },
        ]);

        const entries = await Entry.create([
            { title: "Title 1", date: "2025-06-01", content: "Content 1", tags: [tags[0]._id, tags[1]._id], favorite: false, user_id: user, mood: "😊" },
            { title: "Title 2", date: "2025-06-02", content: "Content 2", tags: [tags[0]._id], favorite: true, user_id: user, mood: "😭" },
        ]);

        const tagId = tags[0]._id;

        let response = await request(app).delete(`/tags/${tagId}`);
        expect(response.body.name).to.equal("Tag 1");
        expect(response.body.user_id).to.equal(user.toString());
        expect(response.body.colour).to.equal("#e992d5");

        response = await request(app).get(`/tags/${user}`);
        expect(response.body).to.be.an("array").with.lengthOf(1);
        expect(response.body[0].name).to.equal("Tag 2");
        
        response = await request(app).get(`/users/${user}/entries`); // returned in date descending order
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an("array").with.lengthOf(2);
        expect(response.body[0].tags).to.be.an("array").empty;
        expect(response.body[1].tags).to.be.an("array").with.lengthOf(1);
        expect(response.body[1].tags[0].name).to.equal("Tag 2");
        expect(response.body[1].tags[0].user_id).to.equal(user.toString());
        expect(response.body[1].tags[0].colour).to.equal("#b8a7ff");
    });
});