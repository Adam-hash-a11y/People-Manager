import { deletePersonById } from "../../personServices";

describe("test deletePersonById function", () => {
  test("should delete a person when id exists", () => {
    // Given
    const id = 14;

    // When
    const result = deletePersonById(id);

    // Then
    expect(result).toBe(true);
  });

  test("should return false when id does not exist", () => {
    // Given
    const id = 999;

    // When
    const result = deletePersonById(id);

    // Then
    expect(result).toBe(false);
  });
});
