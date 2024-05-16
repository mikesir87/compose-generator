const fs = require('fs');
const { execSync } = require('child_process');

function isSupported(directoryPath) {
  const filePath = `${directoryPath}/yarn.lock`;
  return fs.existsSync(filePath);
}

function getDependencies(directoryPath) {
  const dependencyOutput = execSync(
    'yarn list --json',
    { cwd: directoryPath, stdio : 'pipe' }
  ).toString();

  return JSON.parse(dependencyOutput)
    .data
    .trees
    .map(item => item.name.split('@')[0])
    .filter(item => item !== 'undefined')
    .filter((value, index, array) => array.indexOf(value) === index);
}

module.exports = {
  title: "Node.js (Yarn)",
  language: "Node",
  isSupported,
  getDependencies,
};