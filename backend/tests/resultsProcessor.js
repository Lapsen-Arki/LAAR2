const fs = require("fs");
const path = require("path");
module.exports = (testResults) => {
  const simplifiedResults = {
    numSuites: testResults.numTotalTestSuites,
    numTestsSucceeded: testResults.numPassedTests,
    numTestsFailed: testResults.numFailedTests,
    failedTestNames: [],
  };
  testResults.testResults.forEach((suite) => {
    // Iterate through test cases in each suite
    const suiteName = path.basename(suite.testFilePath);
    suite.testResults.forEach((testCase) => {
      if (testCase.status === "failed") {
        const failedMatchers = testCase.failureDetails.filter(
          (detail) => !detail.matcherResult.pass
        );

        const result = {
          suiteName,
          testCaseName: testCase.fullName,
          matcherResult: { actual: [], expected: [] },
        };

        testCase.failureDetails.forEach((detail) => {
          if (!detail.matcherResult.pass) {
            // Update the existing result object with the filtered failedMatchers
            result.matcherResult.actual.push(detail.matcherResult.actual);
            result.matcherResult.expected.push(detail.matcherResult.expected);
          }
        });

        simplifiedResults.failedTestNames.push(result);
      }
    });
  });
  const jsonResults = JSON.stringify(simplifiedResults);
  fs.writeFileSync("./coverage/result.json", jsonResults);

  return testResults;
};
