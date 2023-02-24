const { spawn, execSync, spawnSync } = require("child_process");
const fs = require("fs");
const pty = require("node-pty");

const outputFd = fs.openSync("output.txt", "w");
const outputStream = fs.createWriteStream(null, { fd: outputFd });

const app = pty.spawn("node", ["./index.js", "100000"]);
app.on("data", (e) => outputStream.write(e));
