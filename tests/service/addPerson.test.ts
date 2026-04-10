import { addPerson } from "../../personServices";
import { GENDER, TYPE } from "../../person.type";

describe("test addPerson function", () => {
  test("should add and return a new person", () => {
    //Given
    const payload = {
      id: 16,
      name: "adam Hamdi",
      age: 34,
      gender: GENDER.male,
      type: TYPE.men,
    };

    //When
    const result = addPerson(payload);

    //Then
    expect(result).toStrictEqual({
      id: 16,
      name: "adam Hamdi",
      age: 34,
      gender: GENDER.male,
      type: TYPE.men,
    });
  });

  test("should return null if person with the same id already exists", () => {
    //Given
    const payload = {
      id: 11,
      name: "adam Hamdi",
      age: 34,
      gender: GENDER.male,
      type: TYPE.men,
    };

    //When
    const result = addPerson(payload);

    //Then
    expect(result).toBeNull();
  });
});
