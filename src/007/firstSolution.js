export function longestRunOfTwoNumbers(input) {
  if (typeof input != "string" || input.length <= 0) return "";
  let firstCand = { value: input[0], index: 0 };
  let secondCand = { value: null, index: -1 };
  let maxOption = { length: 0, start: 0 };
  for (let i = 0; i < input.length; i++) {
    //check if we broke our firstCand streak
    if (input[i] != firstCand.value) {
      if (secondCand.value == null) {
        secondCand.value = input[i];
        secondCand.index = i;
      } else {
        //if the character is from the first candidate
        if (input[i] != secondCand.value) {
          //lets check if this has become better than the maxOption
          //we create a new option (of the first candidate)
          const firstCandOption = {
            length: i - firstCand.index,
            start: firstCand.index,
          };
          //compare the options (of the first candidate)
          if (maxOption.length < firstCandOption.length) {
            //if it is better we pick the new option corresponding to the firstCandidate
            maxOption = firstCandOption;
          }
          firstCand = secondCand;
          secondCand = { value: input[i], index: i };
        }
      }
    } else {
      secondCand = { value: null, index: -1 };
    }
  }
  const firstCandOption = {
    length: input.length - firstCand.index,
    start: firstCand.index,
  };

  if (maxOption.length < firstCandOption.length) maxOption = firstCandOption;
  console.log(firstCandOption);
  return input.slice(maxOption.start, maxOption.start + maxOption.length);
}
