import { clearLine, cursorTo } from "readline";

const loadingBar = (percent) => {
  const total = 10;
  const filled = Math.floor(percent / 10);
  const empty = total - filled;
  const bar =
    "[" +
    "\x1b[36m" +
    "=".repeat(filled) +
    "\x1b[0m" +
    "\x1b[31m" +
    "-".repeat(empty) +
    "\x1b[0m" +
    "]";
  const progress = (percent > 0 ? " " : "") + percent + "%";
  return bar + progress;
};

let i = 0;
setInterval(() => {
  i = (i + 1) % 101;
  // clearLine();
  cursorTo(process.stdout, 0);
  process.stdout.write(loadingBar(i));
}, 100);
