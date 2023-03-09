import { findFirstNPrimes } from "../../src/023";
//To Ivan: I was going to test the bar but I remembered you said that I should test only what I write and the library I used does the pinting on the terminal so I am only testing the prime numbers. If you think there is something else I can test let me know.

describe("Find primes numbers", () => {
  describe("Regular cases", () => {
    test("It should find the first N prime numbers for different numbers", () => {
      const primes1 = findFirstNPrimes(1);
      const primes5 = findFirstNPrimes(5);
      const primes8 = findFirstNPrimes(8);
      const primes23 = findFirstNPrimes(23);
      expect(primes1).toEqual([2]);
      expect(primes5).toEqual([2, 3, 5, 7, 11]);
      expect(primes8).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
      expect(primes23).toEqual([
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
        71, 73, 79, 83,
      ]);
    });
  });

  describe("Edge cases", () => {
    //To Ivan: or should I throw?
    test("Negative numbers should return an empty list", () => {
      expect(findFirstNPrimes(-1)).toEqual([]);
    });

    test("Zero should return empty list", () => {
      expect(findFirstNPrimes(0)).toEqual([]);
    });
  });
});
