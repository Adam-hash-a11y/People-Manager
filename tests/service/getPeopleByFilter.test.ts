import { getPeopleByFilter } from "../../personServices";

describe("test getPeopleByFilter function", () => {
  test("should return only males when gender is male", () => {
    // Given
    const gender = "male";
    const type = "";

    // When
    const result = getPeopleByFilter(gender, type);

    // Then
    expect(result.every((p) => p.gender === "male")).toBe(true);
  });

  test("should return only kids when type is kid", () => {
    // Given
    const gender = "";
    const type = "kid";

    // When
    const result = getPeopleByFilter(gender, type);

    // Then
    expect(result.every((p) => p.type === "kid")).toBe(true);
  });

  test("should return filtered result by both gender and type", () => {
    // Given
    const gender = "female";
    const type = "women";

    // When
    const result = getPeopleByFilter(gender, type);

    // Then
    expect(result.every((p) => p.gender === "female")).toBe(true);
    expect(result.every((p) => p.type === "women")).toBe(true);
  });
});
