const fs = require('fs');
const { execSync } = require('child_process');

function isSupported(directoryPath) {
  const filePath = `${directoryPath}/package-lock.json`;
  return fs.existsSync(filePath);
}

function getDependencies(directoryPath) {
  const dependencyOutput = execSync(
    'npm list --omit=dev --json --all --parseable --package-lock-only',
    { cwd: directoryPath, stdio : 'pipe' }
  ).toString();

  const dependencies = Object.keys(
    JSON.parse(dependencyOutput).dependencies
  );

  return dependencies;
}

module.exports = {
  title: "Node.js (npm)",
  language: "Node",
  isSupported,
  getDependencies,
};