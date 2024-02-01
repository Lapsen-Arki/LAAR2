const fs = require("fs");

fs.readFile("output.json", "utf8", function (err, data) {
  if (err) throw err;

  let jsonData = JSON.parse(data);
  let header =
    "St | Directory | Statements% | StCount | Branches% | BrCount | Functions% | FnCount | Lines% | LnCount";
  let separator = Object.keys(jsonData[0])
    .map(() => "---")
    .join(" | ");
  let rows = jsonData.map((obj) => Object.values(obj).join(" | ")).join("\n");

  let table = `| ${header} |\n| ${separator} |\n| ${rows} |`;

  fs.writeFile("output.md", table, "utf8", function (err) {
    if (err) throw err;
    console.log("Saved Markdown table to output.md: \n");
    console.log(table);
  });
});
