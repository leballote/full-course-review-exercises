function findMaxOption(maxOption, firstCand) {
  const newOption = { start: firstCand.start, length: firstCand.length };
  if (newOption.length > maxOption.length) {
    return newOption;
  }
  return maxOption;
}

export function longestRunOfTwoNumbers(input) {
  if (typeof input != "string" || input.length <= 0) return "";

  const n = input.length;
  //we track a first candidate and a second candidate. Only the first candidate can maximize the length
  //but we will need to remember the second candidate to make it the first candidate at some point
  let firstCand = { value: input[0], start: 0, length: 1, secondValue: null };
  let secondCand = null;
  let maxOption = { start: 0, length: 0 };

  let i = 1;
  for (; i < n; i++) {
    firstCand.length++;
    if (input[i] != firstCand.value) {
      secondCand = { value: input[i], start: i, length: 1, secondValue: null };
      firstCand.secondValue = input[i];
      i++;
      break;
    }
  }
  if (!secondCand) return input;

  for (; i < n; i++) {
    if (input[i] == firstCand.value || input[i] == firstCand.secondValue) {
      firstCand.length++;
      secondCand.length++;
    } else {
      maxOption = findMaxOption(maxOption, firstCand);
      secondCand.length++;
      firstCand = secondCand;
      firstCand.secondValue = input[i];
    }

    if (input[i] != secondCand.value) {
      secondCand = { value: input[i], start: i, length: 1 };
    }
  }

  maxOption = findMaxOption(maxOption, firstCand);

  return input.slice(maxOption.start, maxOption.start + maxOption.length);
}
