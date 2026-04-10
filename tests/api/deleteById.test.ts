import request from "supertest";
import { app } from "../../server";
import { Server } from "node:http";

describe("DELETE /:id", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(4000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should delete a person by id", async () => {
    // Given
    const id = 15;

    // When
    const response = await request(app).delete(`/${id}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      message: "person deleted",
    });
  });

  it("should return 404 if person does not exist", async () => {
    // Given
    const id = 999;

    // When
    const response = await request(app).delete(`/${id}`);

    // Then
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      error: "person not found",
    });
  });

  it("should return 400 for invalid id", async () => {
    // Given
    const id = "abc";

    // When
    const response = await request(app).delete(`/${id}`);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "invalid id",
    });
  });
});
