# Compose Generator

This project provides a proof of concept on a tool that can generate a Compose file to run the dependent services for your application. It does so by using the application's dependency tree to identify the dependent services and then generate a Compose file. This example is using gpt-4.

## Try it out!

1. Clone this repo locally

2. Create a `config.json` file at the root of the project with the following structure:

    ```json
    {
      "OPENAI_API_KEY": "sk-****-COMING-FROM-OPENAI-****"
    }
    ```


### Quick run-through

1. Install the dependencies with `yarn install`
2. Run the tool and specify the directory you want to run against:

    ```console
    $ node src/index.js /path/to/project/directory
    ```


### Installing it

1. Install the project globally by running `yarn global add "file:$PWD"`
2. Navigate your CLI to a project and run `compose-generator`
    - If it doesn't work, add `~/.yarn/bin` to your `$PATH` variable

## Development

Coming soon! Currently, development is done against tests. You can start the tests by running `yarn test`.