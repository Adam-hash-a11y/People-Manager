import request from "supertest";
import { app } from "../../server";
import { Server } from "node:http";

describe("GET /people", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(4000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should return 200 with kids, females, and men counts", async () => {
    //When
    const response = await request(app).get("/people");

    //Then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      kids: expect.any(Number),
      females: expect.any(Number),
      men: expect.any(Number),
    });
  });

  it("should return an object with the correct keys", async () => {
    //When
    const response = await request(app).get("/people");

    //Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("kids");
    expect(response.body).toHaveProperty("females");
    expect(response.body).toHaveProperty("men");
  });

  it("should return non-negative counts", async () => {
    //When
    const response = await request(app).get("/people");

    //Then
    expect(response.status).toBe(200);
    expect(response.body.kids).toBeGreaterThanOrEqual(0);
    expect(response.body.females).toBeGreaterThanOrEqual(0);
    expect(response.body.men).toBeGreaterThanOrEqual(0);
  });
});
