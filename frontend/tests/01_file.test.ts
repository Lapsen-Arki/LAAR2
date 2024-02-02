import { expect, test, describe } from "vitest";

describe("Test Suite", () => {
  test("Test", () => {
    expect(true).toBe(false);
    expect(1).toBe(2);
  });
  test("Test 2", () => {
    expect(true).toBe(true);
  });
});
