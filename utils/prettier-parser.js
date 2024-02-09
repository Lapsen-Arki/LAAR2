const fs = require("fs");
const summary = fs.readFileSync("results/prettier-summary.txt", "utf-8");
const summaryLines = summary.split("\n");

if (summaryLines.length <= 3) {
  console.log("Prettier summary is either ok or unexpected format.");
  summaryLines.shift();
  saveMd(summaryLines.join("\n"));
} else {
  console.log("Found prettier summary. Parsing...");
  const parsed = summaryLines.slice(1, -1);
  const resultMessage = parsed.pop();
  const [statusRaw, text] = resultMessage.split("] ");
  let status = ":warning:";
  let msg = status + " " + text;

  parseResults(parsed, msg);
}

function parseResults(parsed, resultMessage) {
  const parsedResults = [];
  for (const line of parsed) {
    const [statusRaw, text] = line.split(" ");

    // Remove brackets from status
    let status = statusRaw.replace(/\[|\]/g, "");

    // Push status and text into parsedResults array
    if (status === "warn") {
      status = ":warning:";
    }
    parsedResults.push({ status, text });
  }
  buildTable(parsedResults, resultMessage);
}

function buildTable(parsedResults, resultMessage) {
  const tableHeader = "| Status | File |";
  const tableSeparator = "| ------ | ---- |";
  const table = `${tableHeader}\n${tableSeparator}`;
  const rows = parsedResults
    .map((obj) => `| ${obj.status} | ${obj.text} |`)
    .join("\n");
  const tableContent = `${table}\n${rows}`;
  const result = `## Result\n\n${resultMessage}`;

  saveMd((tableContent + "\n\n" + result).trim());
}

function saveMd(parsed) {
  const md = `# Prettier generated files summary\n\n` + parsed;
  fs.writeFileSync("results/prettier-summary.md", md);
}
