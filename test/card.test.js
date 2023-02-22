const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;

describe("GET /cards", function () {
  // it.skip("returns all cards", async function () {
  //   const response = await request.get("/api/cards");
  //   console.log({ response });

  //   expect(response.status).to.eql(200);
  //   expect(response.body.length).to.be.greaterThan(0);
  // });

  it("add new card", async function () {
    const request = require("supertest")("http://localhost:3000");
    let response = await request
      .post("/api/card")
      .set("Content-type", "application/json")
      .send({
        name: "BZ",
        pan: "79927398713",
        limit: "23435",
        balance: 10,
      })
      .expect(201);
    console.log({ resp: response.body });

    expect(response.status).to.eql(201);

    response = await request
      .put("/api/card")
      .set("Content-type", "application/json")
      .send({
        id: "GkM4e2CY4",
        name: "BZU",
        pan: "79927398713",
        limit: "23435",
        balance: 10,
      })
      .expect(202);

    console.log({ resp: response.body });

    expect(response.status).to.eql(202);

    response = await request
      .delete("/api/card/GkM4e2CY4")
      .expect(202);

    console.log({ resp: response.body });

    expect(response.status).to.eql(202);


  });
});
