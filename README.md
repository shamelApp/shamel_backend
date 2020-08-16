# NodeJS Template

## Table of contents

- [Run the service locally](#run-the-service-locally)
- [List of existing commands](#list-of-existing-commands)
- [APIS: routes, headers and parameters](#apis-routes-headers-and-parameters)
  - [List of routes](#list-of-routes)
  - [Headers](#headers)
  - [Check out the routes](#check-out-the-routes)
- [Tests](#tests)
- [Project Structure](#project-structure)
  - [lib](#lib)
    - [db](#db)
    - [errors](#errors)
    - [controllers](#controllers)
    - [services](#services)
    - [routers](#routers)
    - [route](#route)
    - [utils](#utils)
    - [validation](#validation)
  - [specs](#specs)
  - [test](#test)

## Run the service locally

Before you begin refer to [how to start with a nodejs project](https://10.4.21.20/TalarK/nodejs-template/wikis/how-to-get-started-with-your-nodejs-project-template) to get detailed documentation for the environment setup. It includes all the necessary download links and guidance.

For adding environment variables, add `.env` file at the root of the project like below and change the default values if needed:

```bash
LOGGING_LEVEL='info'
PORT=5000
MONGODB_HOST='localhost'
MONGODB_PORT='27017'
MONGODB_DATABASE='<DB_NAME>'
MONGODB_USER='<YOUR_MONGO_USERNAME>'
MONGODB_PWD='<YOUR_MONGO_PASSWORD>'
BASE_URL='<CURRENT_MS_URL>'
```

## List of existing commands

|Command          |Description                                 |
|:----------------|:-------------------------------------------|
|`yarn start`     |Starts the service                          |
|`yarn start:dev` |Starts the service in development mode and runs using `nodemon` that restarts the service automatically when a file is changed |
|`yarn test`      |Runs all the dao, integration and unit tests|
|`yarn lint`      |Checks the linting of the project           |

## APIS: routes, headers and parameters

### List of routes

|HTTP Method|Route      |Description                               |
|:----------|:----------|:---------------------------------------- |
|`GET`      |`/`        |Default route                             |
|`GET`      |`/ready`   |Checks if the server is up and ready      |

All the routes of the microservice should be documented using `Swagger` in the project under `specs/`.

### Headers

The above routes don't require any headers.

A route can contain multiple headers. For example:

```bash
Authorization:Bearer <JWT_TOKEN>
Accept:application/vnd.areeba.<MS_SPECIFIC_ATTR>+json; version=1
Content-Type:application/json
```

_Note: `+json; version=1` can be opted from the `Accept` header_

### Check out the routes

- Get the root index

  ```bash
  curl -X GET \
  http://localhost:5000/ \
  ```

- Check if the server is up by getting the `ready` route.

  ```bash
  curl -X GET \
  http://localhost:5000/ready \
  ```

## Tests

To run the tests, the server should be running and mongoDB started

The tests include:

- **DAO**: to test the common MongoDB operations (insertOne, findOne, find, ...)  
- **Unit Tests**: to test the functions and include all the possible use cases
- **Integration** Tests: To test the APIs and the server response by including all the possible use cases

In order to achieve this, we used `mocha` and `chai`.

## Project Structure

```bash
|- lib
|  |-- db
|  |-- errors
|  |-- controllers
|  |  |-- <api name>
|  |-- services
|  |-- routers
|  |-- routes
|  |-- utils
|  |-- validation
|  |  |--auth
|  |  |--db-scheme
|  |  |--version
|- specs
|- test
```

### lib

#### db

Includes database connection handling, common db collection methods, etc..

#### errors

Here you can find utlity functions to help you handle errors.

#### controllers

Includes subfolders with api names containing code that accepts the request and sends it to other corresponding modules and then handles the response or occuring errors.

#### services

This is where the business logic resides. It processes the requested oparations forwarded by the controller.

#### routers

Here are located the express routers. We have default and authenticated routers. The authenticated router is used for routes having the `Authorization` header holding the `Bearer` token.

#### route

Each route is located in a separated file to keep it clear.

#### utils

You can find here utility functions that could be used all aroud the project without having dependencies with other modules.

#### validation

This where you add header validations _(authorization)_, or version check for the `Accept` header or simply validating the request body.

### specs

Each spec projects the controller methods of a single route. They are written in YAML. Swagger preview tool would be helpful to view the specs and test.

### test

The automated test scripts live in this folder. It is separated into three sub folders:

- **DAO**: where we test the direct db manipulation functions
- **Unit**: where we test service functions
- **Integration**: where we perform end-to-end testing
