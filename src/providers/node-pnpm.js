const fs = require('fs');
const { execSync } = require('child_process');

function isSupported(directoryPath) {
  const filePath = `${directoryPath}/pnpm-lock.yaml`;
  return fs.existsSync(filePath);
}

function getDependencies(directoryPath) {
  const REGEX_MATCHER = /\/([a-zA-Z0-9-\.]+)@[0-9.]+\/+/;

  return execSync(
      'pnpm list --prod -r --depth=Infinity --parseable',
      { cwd: directoryPath, stdio : 'pipe' }
    ).toString()
    .split('\n')
    .map(item => item.trim())
    .map(item => {
      const match = REGEX_MATCHER.exec(item);
      return match ? match[1] : null;
    })
    .filter(item => item);
}

module.exports = {
  title: "Node (pnpm)",
  language: "Node",
  isSupported,
  getDependencies,
};