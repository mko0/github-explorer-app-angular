# Github user repository explorer app

## Motivation

The project was created as the task in the recruitment process for the position of front-end developer. Requirements:

- time given to complete the task: weekend;
- style your components by yourself, making solution scalable by using preprocessors and preferable CSS methodology;
- develop your code using actual HTML, CSS and ECMAScript (2015+) standard;
- use one of component based framework, such as Angular/React/Vue or native web components;
- put special attention to the quality and repeatable confirmation of your solution;

## User story

![user-story](user-story.png "User story")

## Test & Build

#### NPM

```
npm run test && npm run build
```

#### Docker

```
docker compose -f docker/docker-compose.yml up --build
```

or for VS Code users "F1 key > Tasks: Run Task > Docker test & build" and open http://localhost/

## Development

#### NPM

```
npm start
```

#### Docker

```
docker compose -f docker/docker-compose.dev.yml up --build
```

or for VS Code users "F1 key > Tasks: Run Task > Docker development" and open http://localhost:4201/

## Open API Generator

Files in directory `src/api/github-client/*` are genereted using [@openapitools/openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli) based on [GitHub API description](https://github.com/github/rest-api-description/blob/main/descriptions/ghes-3.9/ghes-3.9.2022-11-28.json).
