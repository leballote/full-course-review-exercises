#!/usr/bin/env node
import { SingleBar } from "cli-progress";
import colors from "ansi-colors";

function findFirstNPrimes(N, callback) {
  const primes = [];
  let current = 1;
  outer: while (primes.length != N) {
    current++;
    for (const prime of primes) {
      if (current % prime == 0) {
        continue outer;
      }
    }
    primes.push(current);
    if (callback) {
      callback(current, primes);
    }
  }
  return primes;
}

function formatter(options, params, payload) {
  // bar grows dynamically by current progress - no whitespaces are added
  const completeStringLength = Math.round(params.progress * options.barsize);
  const incompleteStringLength = options.barsize - completeStringLength;
  const bar =
    colors.blue(options.barCompleteString.substr(0, completeStringLength)) +
    colors.green(options.barIncompleteString.substr(0, incompleteStringLength));

  // end value reached ?
  // change color to green when finished
  return (
    " [" +
    bar +
    // options.barIncompleteString +
    "] " +
    "# " +
    colors.yellow(payload.task) +
    "   " +
    colors.red(`${(params.progress * 100).toFixed(2)}` + "%") +
    "   " +
    colors.yellow(params.value + "/" + params.total)
  );
}

function findFirstNPrimesLoadingBar(N) {
  const bar = new SingleBar({
    format: formatter, //`${" {bar}"} " {percentage}% | ETA: {eta}s | {value}/{total}"`,
    barsize: 40,
    barCompleteChar: "=", // cyan
    barIncompleteChar: "-",
  });
  bar.start(N, 0);
  const primes = findFirstNPrimes(N, (_, primes) => {
    bar.update(primes.length);
    if (primes.length == N) {
      bar.stop();
    }
  });
  process.stdout.write(Buffer.from(primes.toString()));
}

function main() {
  const argv = process.argv.slice(2);

  if (argv.length < 1) {
    return console.log("Please enter an integer\n");
  }
  if (argv.length > 1) {
    return console.log("Please enter only one number\n");
  }
  let N = parseInt(argv[0]);
  if (Number.isNaN(N)) {
    return console.log("Please enter an integer\n");
  }

  findFirstNPrimesLoadingBar(N);
}

main();
