const fs = require("fs");
const path = require("path");

// Read the test results
const results = JSON.parse(
  fs.readFileSync("../frontend/coverage/rawResults.json", "utf8")
);

const simplifiedResults = {
  numSuites: results.numTotalTestSuites,
  numTestsSucceeded: results.numPassedTests,
  numTestsFailed: results.numFailedTests,
  failedTestNames: [],
};

results.testResults.forEach((suite) => {
  // Iterate through test cases in each suite
  suiteName = path.basename(suite.name);
  suite.assertionResults.forEach((testCase) => {
    if (testCase.status === "failed") {
      simplifiedResults.failedTestNames.push({
        suiteName,
        testCaseName: testCase.fullName,
        message: testCase.failureMessages.join("\n"),
      });
    }
  });
});

// Write the processed results back to the file
fs.writeFileSync(
  "../frontend/coverage/result.json",
  JSON.stringify(simplifiedResults),
  "utf8"
);
