// const taskFactorySample = (delay, resolve, val) => () =>
//   new Promise((res, rej) => setTimeout(resolve ? res : rej, delay, val));

function taskFactorySample(delay, resolve, val) {
  return function () {
    return new Promise((res, rej) => {
      return setTimeout(
        () => {
          resolve ? res(val) : rej(val);
        },
        delay,
        val
      );
    });
  };
}

const tasks = [
  taskFactorySample(500, true, 1),
  taskFactorySample(1000, true, 2),
  taskFactorySample(5000, false, "error"),
  taskFactorySample(2000, true, 4),
  taskFactorySample(1000, false, "error"),
  taskFactorySample(1000, false, "error"),
];
// only run two promises at a time
const pool_size = 2;
/**
 *  Expect to get an array equal to tasks.length
 *  with the values or reasons for each of the promises.
 *
 *  [{value: 1}, {value:2}, {error: 'error'}, ...]
 */
runTasks(tasks, pool_size).then(console.log);

async function createChannel({ tasks, out, id }) {
  while (tasks.length > 0) {
    const task = tasks.pop();

    try {
      out[task.index] = { value: await task.value() };
    } catch (e) {
      out[task.index] = { error: e };
    }
  }
  return [out, id];
}

async function createNChannels(n, tasks) {
  const out = [];
  const channelPromises = [];
  const tasksLength = tasks.length;
  for (let i = 0; i < n; i++) {
    channelPromises[i] = createChannel({
      tasks,
      out,
      originalLength: tasksLength,
      id: i,
    });
  }
  await Promise.all(channelPromises);
  return out;
}

export default async function runTasks(tasks, pool_size) {
  if (tasks.length < pool_size) {
    return await Promise.all(tasks);
  } else {
    const tasks_ = tasks.map((task, index) => ({ value: task, index }));
    const res = await createNChannels(pool_size, tasks_);
    return res;
  }
}
