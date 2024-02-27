const fs = require("fs");

// Read the file
const data = fs.readFileSync("coverage.txt", "utf8");

// Split the text into lines
const lines = data.split("\n");

// The first line contains the keys
const keys = lines[1].split("|").map((key) => key.trim());

// The rest of the lines contain the values
const values = lines
  .slice(3)
  .map((line) => line.split("|").map((value) => value.trim()));

// Combine the keys and values into a list of objects
const jsonData = values.map((value) => {
  const obj = {};
  keys.forEach((key, i) => {
    obj[key] = value[i];
  });
  return obj;
});

// Convert the list of objects into a JSON string
const jsonStr = JSON.stringify(jsonData, null, 2);
