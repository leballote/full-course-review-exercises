export function longestRunOfTwoNumbers(input) {
  if (input.length == 0) return "";

  let n = input.length;
  let firstCand = { value: input[0], start: 0, end: 1 };
  let secondCand = { value: null, start: null, end: null };
  let maxOption = { start: 0, length: 1 };

  let i = 1;

  //we search for our first second candidate

  for (; i < n; i++) {
    firstCand.end++;
    if (input[i] != firstCand.value) {
      secondCand = { value: input[i], start: i, end: i + 1 };
      //because we are breaking we have to increase the i manually
      i++;
      break;
    }
  }

  //if we don't find it it means it was only one character in all the string, and we return it
  if (secondCand.value == null) return input;

  // we continue with the iteration
  for (; i < n; i++) {
    //if it was a different value from our candidates, first we check if we change the max. Independent from the result, we reset the second candidate
    if (input[i] != secondCand.value) {
      secondCand.value = {};
    }

    if (input[i] != firstCand.value && input[i] != secondCand.value) {
      const newOption = {
        start: firstCand.start,
        length: firstCand.end - firstCand.start,
      };
      console.log("NEW OPTION", newOption);
      console.log(
        "NEW OPTION STRING",
        input.slice(newOption.start, newOption.start + newOption.length)
      );

      if (maxOption.length < newOption.length) {
        maxOption = newOption;
      }

      firstCand = secondCand;
      secondCand = { value: input[i], start: i, end: i + 1 };
    } else {
      firstCand.end++;
      secondCand.end++;
    }
  }

  //
  const newOption = {
    start: firstCand.start,
    length: firstCand.end - firstCand.start,
  };

  if (maxOption.length < newOption.length) {
    maxOption = newOption;
  }

  return input.slice(maxOption.start, maxOption.start + maxOption.length);
}
console.log("ANS", longestRunOfTwoNumbers("1212223311212223"));
