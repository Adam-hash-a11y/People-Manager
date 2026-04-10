import request from "supertest";
import { app } from "../../server";
import { Server } from "node:http";
import { GENDER, TYPE } from "../../person.type";

describe("POST /people/add", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(4000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should add a person and return 201", async () => {
    //Given
    const payload = {
      id: 98,
      name: "adam hamdi",
      age: 30,
      gender: GENDER.male,
      type: TYPE.men,
    };

    //When
    const response = await request(app).post("/people/add").send(payload);

    //Then
    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      id: 98,
      name: "adam hamdi",
      age: 30,
      gender: GENDER.male,
      type: TYPE.men,
    });
  });

  it("should return 400 if a person with the same id already exists", async () => {
    //Given
    const payload = {
      id: 11,
      name: "Mia Taylor",
      age: 26,
      gender: GENDER.female,
      type: TYPE.women,
    };

    //When
    const response = await request(app).post("/people/add").send(payload);

    //Then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "person already exists" });
  });

  it("should return 400 if a field is missing", async () => {
    //Given
    const payload = {
      id: 97,
      name: "John Doe",
      age: 25,
      gender: GENDER.male,
    };

    //When
    const response = await request(app).post("/people/add").send(payload);

    //Then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "missing fields" });
  });

  it("should return 400 if id is not a number", async () => {
    //Given
    const body = {
      id: "abc",
      name: "John Doe",
      age: 25,
      gender: GENDER.male,
      type: TYPE.men,
    };

    //When
    const response = await request(app).post("/people/add").send(body);

    //Then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "id and age must be numbers",
    });
  });
});
