// import runTasks from "../../001";
test("placeholder", () => {});
// function taskFactorySample(delay, resolve, val, timeRanges) {
//   return function () {
//     return new Promise((res, rej) => {
//       const timeRange = { start: new Date(), end: null };
//       timeRanges.push(timeRange);
//       return setTimeout(
//         () => {
//           timeRange.end = new Date();
//           resolve ? res(val) : rej(val);
//         },
//         delay,
//         val
//       );
//     });
//   };
// }

// test.skip("It should run exactly 2 at every time", async () => {
//   const timeRanges = [];
//   const tasks = [
//     taskFactorySample(500, true, 1, timeRanges),
//     taskFactorySample(1000, true, 2, timeRanges),
//     taskFactorySample(5000, false, "error", timeRanges),
//     taskFactorySample(2000, true, 4, timeRanges),
//     taskFactorySample(1000, false, "error", timeRanges),
//     taskFactorySample(1000, false, "error", timeRanges),
//   ];
//   const pool_size = 2;

//   const ans = await runTasks(tasks, pool_size);
//   for (const timeRange of timeRanges) {
//   }
// });
