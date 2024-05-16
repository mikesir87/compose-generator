#!/usr/bin/env node
const term = require('terminal-kit').terminal;
const fs = require("fs");
const { getInfo } = require('./ai');
const providers = require('./providers');

async function run(directory) {
  term("🚀 Welcome to the Docker Compose Generator!\n");
  term("🚀 Let's get started!\n");
  term(`🚀 Project directory: ${directory}\n`);

  const detectionSpinner = await term.spinner();
  term.blue(" Detecting project type... \n");
  
  await wait(1200);

  const provider = providers.find(provider => provider.isSupported(directory));
  detectionSpinner.animate(false);

  if (!provider) {
    term.red(`🚨 Unable to detect the project. Aborting now...\n`);
    return;
  }

  term.green(`🎉 Detected project - ${provider.title}\n`);

  await promptConfirmation("Do you want to proceed?", "Ok. Exiting now...");

  const dependencySpinner = await term.spinner();
  term.blue(" Detecting dependencies... \n");

  await wait(1200);

  const dependencies = await provider.getDependencies(directory);
  dependencySpinner.animate(false);
  term.green(`🎉 Discovered ${dependencies.length} dependencies in the full dependency tree\n`);

  const buildingComposeFileSpinner = await term.spinner();
  term.blue(" Generating Compose file... \n");
  const response = await getInfo(provider.language, dependencies);

  buildingComposeFileSpinner.animate(false);

  // console.log("RAW REPSONSE", response.content);

  const { composeFile, description, detectedServices } = JSON.parse(response.content);

  term.green("🎉 Compose File Generated!\n");
  term.green("🎉 Discovered services: ").white(`${detectedServices}\n`);
  term.green("🎉 Compose file:\n").white(`${composeFile}\n`);

  term.green(`🎉 Additional details:\n`).white(`${description}\n`);

  await promptConfirmation("Save the compose to a file?", "Ok. All done!");

  const startingComments = description.split("\n")
    .flatMap(line => line.match(/(?![^\n]{1,80}$)([^\n]{1,80})\s/g) || line) // Word wrap at 80 characters
    .map(line => `# ${line.trimStart()}`)
    .join("\n");
  fs.writeFileSync("compose.generated.yaml", `${startingComments}\n${composeFile}`);
  term.green("🎉 Compose file saved to compose.generated.yaml\n");
}

async function wait(millis) {
  return new Promise((acc) => setTimeout(acc, millis));
}

async function promptConfirmation(prompt, rejectionMessage) {
  term(`❓ ${prompt} [Y|n]\n`) ;

  const yesOrNoResult = term.yesOrNo( { yes: [ 'y' , 'ENTER' ] , no: [ 'n' ] });
  const result = await yesOrNoResult.promise;
  if (result)
    return;

  term.red(`🚨 ${rejectionMessage}\n`);
  process.exit();	
}

const directory = process.argv[2] || process.cwd();

run(directory)
  .catch(err => {
    console.error(err);
    process.exit(1);
  });