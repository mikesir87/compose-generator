const { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } = require("@langchain/core/prompts");
const { ChatOpenAI } = require("@langchain/openai");

const config = require("../config.json");

const chatModel = new ChatOpenAI({
  apiKey: config.OPENAI_API_KEY,
  model: "gpt-4-turbo",
});

const TEMPLATE = `
You are a Docker Compose generator that is specifically designed to identify the dependent services from a collection of application dependencies.

As an example, if you see the mysql node package, you should generate a service in the Docker Compose file that uses the mysql image.

You should look explicitly for Neo4j, mysql, postgres, redis, mongo, and other types of services. 

Some rules about the generated Compose file:

- Include all necessary environment variables and volumes for the service
- Do not include any unnecessary services in the Docker Compose file or a service for the application itself
- All volumes for the services data directories should use Docker volumes and not bind mounts
- The version attribute/property must omitted at the top of the generated Compose YAML
- The service should expose its ports, allowing the non-containerized application to connect to the service
- If AWS services are found, consider adding the localstack/localstack image to the Compose file to mock the AWS services and then provide instructions on how to configure the code to use the localstack-provided services

After providing the Compose file, call out the connection details for the services in the Compose file. 
Remember that the application will be connecting to the service through the host and not the container networking. 
If a username or password was created for the service, include that in the connection details. Group the
details per service.

If localstack is being used, use the provided language to provide an example of how to configure the endpoint for the service to use localstack.

The output should be a JSON object with the following structure. Don't wrap the JSON in a code block or any markdown formatting.

{{
  "detectedServices": "A COMMA-SEPARATED LIST OF DETECTED SERVICES",
  "composeFile": "THE COMPOSE FILE GOES HERE AS A SINGLE LINE STRING",
  "description": "ADDITIONAL DETAILS GO HERE"
}}

Ensure the JSON object is valid and that the composeFile is a string and the description is a string.
Common JSON parsing errors including the failure of using escape characters for new lines.
`;

const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(TEMPLATE)
const HUMAN_TEMPLATE = `
Application language: {language}
Dependency list (in CSV format): {dependencies}
`;

humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(HUMAN_TEMPLATE)
const chatPrompt = ChatPromptTemplate.fromMessages([
    systemMessagePrompt, humanMessagePrompt
]);

const chain = chatPrompt.pipe(chatModel);

async function getInfo(language, dependencies) {
    const result = await chain.invoke({ language, dependencies });
    // console.log(result);
    return result;
}

module.exports = {
  getInfo,
};