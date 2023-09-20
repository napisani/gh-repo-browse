# Github Repo Browser (gh-repo-browse)

## Overview

This application is webapp, built in react, which can be used to search and browse Github repositories. 
gh-repo-browse uses the public Github API for searching the available repositories. (authentication is not required)

## Run the app


For development, you can run this app by performing the following steps. Please ensure to have a current version of nodejs installed on your system first.
```bash
# clone the git repository 
git clone github.com/napisani/gh-repo-browse.git
cd gh-repo-browse


# install all dependencies using npm
npm install

# start the app in dev-mode
npm run start

# open http://localhost:3000 in a web browser
```



For production builds/deploys you can package this application into an nginx-based container which exposes an http server port 8080.
Here are the steps for building the docker image with production-mode bundled code. Please ensure that you have a current version of docker installed on your system.

```bash

# clone the git repository 
git clone github.com/napisani/gh-repo-browse.git
cd gh-repo-browse

# this will start the multi-stage docker image build process which 
# will both build the react app and package it into the nginx contianer
docker build -t gh-repo-browse .

# start the resulting container and map 8080 to a local port
docker run -p 8080:8080 gh-repo-browse

# open a web browser to http://localhost:8080

```


## Testing

After having cloned the project locally for development, you can also run the jest test suite by using the following commands
```
# run the jest tests
npm run test

# run the tests in watch mode
npm run test --watchAll

```

## Linting

The linter can be run periodically using the following commands
```
# check for lint issues without fixing anything 
npm run lint

# check and fix the fixable lint issues in-place
npm run lint:fix 

```

## How to deploy this gh-repo-browse

Since this app is packaged as a docker image, the intention is that the docker image can be published to a docker image registry 
and deployed to any popular hosting solution that supports docker images. 
Alternatively, this docker can also be easily deployed to an existing Kubernetes cluster with some supporting resources for defining 
the gh-repo-browse application as a deployment/service.


## Technical Decisions

This app was initialized by the create-react-app script in the 
interest of getting an app started without a lot of manual configuration.

Two notable 3rd-party packages used to improve this project were:
eslint/prettier - I configured eslint a prettier to support standard linting rules and code style across the codebase
tailwind - Tailwind is a CSS utility framework which I added in hopes of making it easier to style each individual component


### Structure and organization

`components/` and `pages/`
All of the react components in this project are separated into two main categories "components" and "pages".
Components are categorized as tiny, highly-reusable react components that can be used in 1 or many contexts.
Conversely, pages are typically single-purpose components without properties that represent a given page/route.
Page components, generally utilize many reusable components to implement a given page.

`mocks/`
this contains modules that export mock data used for unit testing

`utils/`
this contains pure-typescript modules that export common reusable types, functions etc.


## Future development

Here are some ideas for future development:

1. add a list of selectable columns to be displayed in the table ( what is displayed right now is a small subset of the API response data)
2. improve search usability by detecting <Enter> key strokes and submitting the form automatically
3. debounce searches to ensure that rapid search submissions and sorts do not result it an too many API requests
4. add a loading indicator  when the search results are being requested

