export function longestRunOfTwoNumbers(input) {
  if (typeof input != "string" || input.length <= 0) return "";

  //we track a first candidate and a second candidate. Only the first candidate can maximize the length
  //but we will need to remember the second candidate to make it the first candidate at some point
  let firstCand = { value: input[0], start: 0, length: 1 };
  let secondCand = { value: null, start: -1, length: 0 };
  let maxOption = { length: 0, start: 0 };

  for (let i = 1; i < input.length; i++) {
    if (secondCand.start == -1) {
      if (input[i] == firstCand.value) {
        firstCand.length++;
      } else {
        secondCand = { value: input[i], start: i, length: 1 };
        firstCand.length++;
      }
    } else {
      if (input[i] == firstCand.value) {
        firstCand.length++;
        secondCand = { value: secondCand.value, start: -1, length: 0 };
      } else if (input[i] == secondCand.value) {
        firstCand.length++;
        secondCand.length++;
      } else {
        secondCand.length++;
        if (firstCand.length > maxOption.length) {
          maxOption = { start: firstCand.start, length: firstCand.length };
        }

        firstCand = secondCand;
        secondCand = { value: input[i], start: i, length: 1 };
      }
    }

    console.group(
      "INPUT:",
      i,
      "VALUE:",
      input[i],
      "SUBSTR",
      input.slice(0, i + 1)
    );
    console.log("firstCand: ", firstCand);
    console.log("secondCand: ", secondCand);
    console.log(
      "maxOption: ",
      maxOption,
      input.slice(maxOption.start, maxOption.start + maxOption.length)
    );
    console.groupEnd();
  }
  console.group("AFTER FOR");
  console.log("firstCand:", firstCand);
  console.log("secondCand:", secondCand);
  console.groupEnd();

  if (firstCand.length > maxOption.length) {
    maxOption = { start: firstCand.start, length: firstCand.length };
  }

  return input.slice(maxOption.start, maxOption.start + maxOption.length);
}

console.log("ANS", longestRunOfTwoNumbers("12324426655621"));
// we have second candidate
//   input[i] == firstCandidate.value
//   input[i] == secondCandidate.value
//   input[i] != firstCandidate.value && input[i] == secondCandidate.value

// we don't have second candidate
//   input[i] == firstCandidate.value
//   input[i] != firstCandidate.value
