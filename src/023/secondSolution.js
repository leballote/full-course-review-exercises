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
  process.stdout.clearLine(); // clear the current line
  process.stdout.cursorTo(0); // move the cursor to the start of the line
  process.stdout.write(loadingBar(i)); // write the updated loading bar
}, 100);
