const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => {
      // Extract the number prefix from the test file names
      const matchA = testA.path.match(/(\d+)_/);
      const matchB = testB.path.match(/(\d+)_/);
      const numberA = matchA ? parseInt(matchA[1]) : 0;
      const numberB = matchB ? parseInt(matchB[1]) : 0;
      // Sort the tests based on the number prefix
      return numberA - numberB;
    });
  }
}

module.exports = CustomSequencer;
