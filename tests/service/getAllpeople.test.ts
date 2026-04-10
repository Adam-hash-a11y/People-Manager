import { getAllPeople } from "../../personServices";

describe("test getAllPeople function", () => {
  test("should return the count of kids adn females and men", () => {
    //When
    const result = getAllPeople();

    //Then
    expect(result).toStrictEqual({
      kids: expect.any(Number),
      females: expect.any(Number),
      men: expect.any(Number),
    });
  });

  test("should return non negative count of people", () => {
    //When
    const result = getAllPeople();

    //Then
    expect(result.kids).toBeGreaterThanOrEqual(0);
    expect(result.females).toBeGreaterThanOrEqual(0);
    expect(result.men).toBeGreaterThanOrEqual(0);
  });
});
