import express from "express";
import dotenv from "dotenv";
import {
  filterById,
  getAllPeople,
  addPerson,
  getPeopleByFilter,
  deletePersonById,
} from "./personServices";
import bodyParser from "body-parser";
import validator from "validator";

dotenv.config();

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/people", (req, res) => {
  const result = getAllPeople();
  res.status(200).json(result);
});

app.get("/people/filter", (req, res) => {
  const gender = req.query.gender as string;
  const type = req.query.type as string;

  const validGenders = ["male", "female"];
  const validTypes = ["men", "women", "kid"];

  if (gender && !validGenders.includes(gender)) {
    return res.status(400).json({ error: "invalid gender" });
  } else if (type && !validTypes.includes(type)) {
    return res.status(400).json({ error: "invalid type" });
  }

  const result = getPeopleByFilter(gender, type);

  return res.status(200).json(result);
});

app.get("/:id", (req, res) => {
  if (!validator.isInt(req.params.id)) {
    return res.status(400).json({ error: "invalid id, the id must a number" });
  }
  const userId = Number(req.params.id);
  const test = filterById(userId);
  if (test.length == 0) {
    return res.status(404).json({ error: "person is not found" });
  } else {
    res.status(200).json(test);
  }
});

app.delete("/:id", (req, res) => {
  if (!validator.isInt(req.params.id)) {
    return res.status(400).json({ error: "invalid id" });
  }
  const id = Number(req.params.id);
  const deleted = deletePersonById(id);

  if (!deleted) {
    return res.status(404).json({ error: "person not found" });
  }

  return res.status(200).json({ message: "person deleted" });
});

app.post("/adam", (req, res) => {
  res.status(200).json(req.body);
});

app.post("/people/add", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const type = req.body.type;

  if (!id || !name || !age || !gender || !type) {
    return res.status(400).json({ error: "missing fields" });
  }

  if (!validator.isInt(String(age)) || !validator.isInt(String(id))) {
    return res.status(400).json({ error: "id and age must be numbers" });
  }

  const person = addPerson(req.body);

  if (!person) {
    return res.status(400).json({ error: "person already exists" });
  }

  return res.status(201).json(person);
});
