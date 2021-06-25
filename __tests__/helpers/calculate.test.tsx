import {
  calculateSumOfPledges,
  calculatePledge,
} from "../../helpers/calculate";

const createMock = (deleted: string | null, goalsStart: number) => {
  return {
    created: "created",
    donorId: "id",
    amountPerGoal: 3,
    playerId: "playerId",
    deleted: deleted,
    goalsStart: goalsStart,
    goalsEnd: 3,
  };
};

describe("Test calculations", () => {
  test("Test correct calculation", () => {
    expect(calculatePledge(5, createMock(null, 0))).toEqual(15);
  });
  test("Test zero pledge", () => {
    expect(calculatePledge(5, createMock(null, 5))).toEqual(0);
  });
  test("Test correct calculation with goalsSrart > 0", () => {
    expect(calculatePledge(5, createMock(null, 2))).toEqual(9);
  });
  test("Test correct calculation after delete", () => {
    expect(calculatePledge(5, createMock("deleted", 0))).toEqual(9);
  });
});
