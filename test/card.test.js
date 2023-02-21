const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;

describe("GET /cards", function () {
  it("returns all cards", async function () {
    const response = await request.get("/api/cards");

    expect(response.status).to.eql(200);
    expect(response.body.length).to.be.greaterThan(0);
  });
});