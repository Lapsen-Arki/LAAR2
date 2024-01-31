const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

fs.readFile(
  "../backend/coverage/lcov-report/index.html",
  "utf8",
  function (err, _data) {
    if (err) throw err;

    const dom = new JSDOM(_data);
    let tbody = dom.window.document.querySelector("tbody");
    let rows = tbody.querySelectorAll("tr");
    let data = Array.from(rows).map((row) => {
      let cols = row.querySelectorAll("td");
      let stPct = parseFloat(cols[2].textContent);
      let color;
      if (stPct > 80) {
        color = ":green_circle:";
      } else if (stPct < 40) {
        color = ":red_circle:";
      } else {
        color = ":orange_circle:";
      }
      return {
        status: color,
        path: cols[0].querySelector("a").textContent,
        stPct: cols[2].textContent,
        stCnt: cols[3].textContent,
        brPct: cols[4].textContent,
        brCnt: cols[5].textContent,
        fnPct: cols[6].textContent,
        fnCnt: cols[7].textContent,
        lnPct: cols[8].textContent,
        lnCnt: cols[9].textContent,
      };
    });

    let json = JSON.stringify(data);
    fs.writeFile("output.json", json, "utf8", function (err) {
      if (err) throw err;
      console.log("Saved JSON data to output.json");
    });
  }
);
