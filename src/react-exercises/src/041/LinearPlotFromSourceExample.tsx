import { LinearPlotFromSource } from "./LinearPlotFromSource";

function sourceFn(emitter: any, END: any, getValues: any) {
  const maxSecs = 1000;
  let secs = 0;
  const interval = setInterval(() => {
    if (secs++ >= maxSecs) {
      emitter(END);
    } else {
      emitter([[secs, Math.random()], ...getValues()]);
    }
  }, 100);

  return () => {
    clearInterval(interval);
  };
}

export default function LinearPlotFromSourceExample() {
  return <LinearPlotFromSource source={{ sourceFn }} />;
}
