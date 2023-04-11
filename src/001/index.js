export default async function runTasks(tasks, pool_size) {
  if (tasks.length < pool_size) {
    const tasksPromises = tasks.map((task) => task());
    const settled = await Promise.allSettled(tasksPromises);
    // return Promise.all(tasks);
    const out = settled.map((res) =>
      res.status == "fulfilled" ? { value: res.value } : { error: res.reason }
    );
    return out;
  } else {
    const tasks_ = tasks
      .reverse()
      .map((task, index) => ({ value: task, index }));
    const res = await createNChannels(pool_size, tasks_);
    return res;
  }
}

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
