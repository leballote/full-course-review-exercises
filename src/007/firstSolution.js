export function longestRunOfTwoNumbers(input) {
  if (typeof input != "string" || input.length <= 0) return "";

  //we track a first candidate and a second candidate. Only the first candidate can maximize the length
  //but we will need to remember the second candidate to make it the first candidate at some point
  let firstCand = { value: input[0], index: 0 };
  let secondCand = { value: null, index: -1 };
  let maxOption = { start: 0, length: 0 };

  for (let i = 0; i < input.length; i++) {
    //check if we broke our firstCand streak
    if (input[i] != firstCand.value) {
      if (secondCand.value == null) {
        secondCand.value = input[i];
        secondCand.index = i;
      } else {
        //if there is a second candidate, and input[i] is different from both first and second candidate, we compare the first candidate with the current maximum option, and then we move the candidates
        if (input[i] != secondCand.value) {
          //lets check if this has become better than the maxOption
          //we create a new option (of the first candidate)
          const firstCandOption = {
            start: firstCand.index,
            length: i - firstCand.index,
          };
          //compare the options (of the first candidate)
          if (maxOption.length < firstCandOption.length) {
            //if it is better we pick the new option corresponding to the firstCandidate
            maxOption = firstCandOption;
          }
          //we update the candidates; the first candidate becomees the previous second one, and the second candidate now corresponds to the newst value that appeared
          firstCand = secondCand;
          secondCand = { value: input[i], index: i };
        }
      }
    } else {
      //if it is equal to the first candidate then we have to reset the second candidate
      secondCand = { value: null, index: -1 };
    }
  }

  //since we are only updating maxOption when we find a different value than the first candidate and the second candidate. It is possible then, than the last "first candidate" is the longest run, but was never checked against the maxOption, so we do it now:

  const firstCandOption = {
    start: firstCand.index,
    length: input.length - firstCand.index,
  };

  if (maxOption.length < firstCandOption.length) maxOption = firstCandOption;
  console.log(firstCandOption);
  return input.slice(maxOption.start, maxOption.start + maxOption.length);
}

console.log("ANS", longestRunOfTwoNumbers("111222111221"));
