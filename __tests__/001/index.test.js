import runTasks from "../../dist/001";

jest.setTimeout(7000);

function taskFactorySample(delay, resolve, val, timeRanges) {
  return function () {
    return new Promise((res, rej) => {
      const timeRange = { start: new Date(), end: null };
      timeRanges.push(timeRange);
      return setTimeout(
        () => {
          timeRange.end = new Date();
          resolve ? res(val) : rej(val);
        },
        delay,
        val
      );
    });
  };
}
function isInRange(x, ran) {
  let x0 = ran.start;
  let x1 = ran.end;
  return x0 <= x && x <= x1;
}

function findMaxInter(points) {
  let ans = 1;
  points.sort((a, b) => a.start - b.start);
  let currentRange = points[0];
  for (let i = 1; i < points.length; i++) {
    let x0 = points[i].start;
    let x1 = points[i].end;
    if (isInRange(x0, currentRange)) {
      currentRange = {
        start: Math.max(currentRange.start, x0),
        end: Math.min(currentRange.end, x1),
      };
    } else {
      currentRange = { start: x0, end: x1 };
      ans++;
    }
  }
  return ans;
}

test("It should run exactly 2 at every time", async () => {
  const timeRanges = [];
  const tasks = [
    taskFactorySample(500, true, 1, timeRanges),
    taskFactorySample(1000, true, 2, timeRanges),
    taskFactorySample(5000, false, "error", timeRanges),
    taskFactorySample(2000, true, 4, timeRanges),
    taskFactorySample(1000, false, "error", timeRanges),
    taskFactorySample(1000, false, "error", timeRanges),
  ];
  const pool_size = 2;

  const ans = await runTasks(tasks, pool_size);
  const maxInter = findMaxInter(timeRanges);
  expect(maxInter).toBeLessThanOrEqual(pool_size);
  expect(ans).toEqual([
    { value: 1 },
    { value: 2 },
    { error: "error" },
    { value: 4 },
    { error: "error" },
    { error: "error" },
  ]);
});

test("No tasks", async () => {
  const ans = await runTasks([], 2);
  expect(ans).toEqual([]);
});

test("One task, pool size 1", async () => {
  const timeRanges = [];
  const tasks = [taskFactorySample(500, true, 1, timeRanges)];
  const pool_size = 1;

  const ans = await runTasks(tasks, pool_size);
  const maxInter = findMaxInter(timeRanges);
  expect(maxInter).toBeLessThanOrEqual(pool_size);
  expect(ans).toEqual([{ value: 1 }]);
});

test("Pool size greater than tasks length", async () => {
  const timeRanges = [];
  const tasks = [
    taskFactorySample(500, true, 1, timeRanges),
    taskFactorySample(5000, false, "error", timeRanges),
  ];
  const pool_size = 10;

  const ans = await runTasks(tasks, pool_size);
  const maxInter = findMaxInter(timeRanges);
  expect(maxInter).toBeLessThanOrEqual(pool_size);
  expect(ans).toEqual([{ value: 1 }, { error: "error" }]);
});
