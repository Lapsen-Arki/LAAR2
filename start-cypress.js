const { spawn } = require("child_process");

const cypressCommand = process.argv[2] || "open";

const backendProcess = spawn(
  "cmd",
  ["/c", "cd", "backend", "&", "npm", "run", "dev"],
  { detached: true }
);
backendProcess.unref();

// Start the frontend
const frontendProcess = spawn(
  "cmd",
  ["/c", "cd", "frontend", "&", "npm", "run", "dev"],
  { detached: true }
);
frontendProcess.unref();

const cypressProcess = spawn("cmd", ["/c", "npx", "cypress", cypressCommand], {
  detached: true,
});

cypressProcess.on("close", (code) => {
  console.log(`Cypress exited with code ${code}`);

  spawn("taskkill", ["/pid", backendProcess.pid, "/f", "/t"]);
  spawn("taskkill", ["/pid", frontendProcess.pid, "/f", "/t"]);
});
