const fs = require("fs");

// Read the content of the coverage.txt file
const backendCoverageBuffer = fs.readFileSync(
  "../backend/coverage/coverage.txt"
);

// Convert the buffer to a string
const backendCoverage = backendCoverageBuffer.toString("utf-8");

// Split the content into lines
const lines = backendCoverage.split("\n");

// Remove the first and last line
const trimmedLines = lines.slice(1, -2);

// Create or overwrite a Markdown file with the content
fs.writeFileSync(
  "backend_coverage.md",
  `# Backend Coverage\n\n${trimmedLines.join("\n")}`
);
