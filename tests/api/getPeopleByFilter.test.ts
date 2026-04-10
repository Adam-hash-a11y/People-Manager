import request from "supertest";
import { app } from "../../server";
import { Server } from "node:http";

describe("GET /people/filter", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(4000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should return filtered people by gender", async () => {
    // Given
    const gender = "male";

    // When
    const response = await request(app).get(`/people/filter?gender=${gender}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body.every((p: any) => p.gender === gender)).toBe(true);
  });

  it("should return filtered people by type", async () => {
    // Given
    const type = "kid";

    // When
    const response = await request(app).get(`/people/filter?type=${type}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body.every((p: any) => p.type === type)).toBe(true);
  });

  it("should return error (400) for invalid gender", async () => {
    // Given
    const gender = "invalidGender";

    // When
    const response = await request(app).get(`/people/filter?gender=${gender}`);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "invalid gender" });
  });

  it("should return error (400) for invalid type", async () => {
    // Given
    const type = "invalidType";

    // When
    const response = await request(app).get(`/people/filter?type=${type}`);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "invalid type" });
  });
});
