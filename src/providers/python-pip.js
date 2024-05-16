const fs = require('fs');

function isSupported(directoryPath) {
  const filePath = `${directoryPath}/requirements.txt`;
  return fs.existsSync(filePath);
}

// Don't have a good way to get the entire dependency tree. So... 
// just getting the top-level dependencies for now.
function getDependencies(directoryPath) {
  const dependencies = fs.readFileSync(`${directoryPath}/requirements.txt`, 'utf8')
    .toString()
    .split('\n')
    .map(item => item.split('==')[0]);

  return dependencies;
}

module.exports = {
  title: "Python (pip)",
  language: "Python",
  isSupported,
  getDependencies,
};