import {
  connectNodesSequentially,
  createLinkedListNode as N,
} from "../../dist/utils/ds.utils";
import { findLoopStart } from "../../dist/016";

describe("Cicle", () => {
  test("One node cicle", () => {
    const cicleStart = N(42);
    const head = connectNodesSequentially([cicleStart, cicleStart]);
    expect(findLoopStart(head)).toEqual(cicleStart);
  });

  test("Two nodes cicle", () => {
    const cicleStart = N(4);
    const head = connectNodesSequentially([cicleStart, N(7), cicleStart]);
    expect(findLoopStart(head)).toEqual(cicleStart);
  });

  test("Generic", () => {
    const cicleStart = N(3);
    const head = connectNodesSequentially([
      N(1),
      N(2),
      N(2),
      cicleStart,
      N(3),
      N(6),
      N(7),
      N(2),
      N(1),
      cicleStart,
    ]);
    expect(findLoopStart(head)).toEqual(cicleStart);
  });

  test("Whole list cicle", () => {
    const cicleStart = N(1);
    const head = connectNodesSequentially([
      cicleStart,
      N(2),
      N(2),
      N(3),
      N(3),
      N(6),
      N(7),
      N(2),
      N(1),
      cicleStart,
    ]);
    expect(findLoopStart(head)).toEqual(cicleStart);
  });
});

describe("Doesn't cicle", () => {
  test("Null", () => {
    expect(findLoopStart(null)).toEqual(null);
  });
  test("Generic", () => {
    const list = connectNodesSequentially([N(1), N(2), N(5), null]);
    expect(findLoopStart(list)).toEqual(null);
  });
});
