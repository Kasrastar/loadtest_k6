# K6 Load Testing for API
 This project is designed to perform load testing on various APIs using K6, a modern open-source load testing tool. The goal is to simulate traffic to the APIs and evaluate their performance under different load conditions.

### Table of Contents
* overview
* Features
* Getting Started
    * Prerequisites
    * Setup Instructions
* Running the Test
    * Without Docker
    * Using Docker
* Project Structure
* Contributing

### Overview
This repository contains the K6 scripts and utilities required to load test various APIs for a project. It integrates dynamic request generation based on configurations, including the ability to handle different HTTP methods, query parameters, and payloads. The project is also capable of validating API responses based on JSON schemas.
The project uses Docker for environment isolation, ensuring that the testing environment is portable and reproducible.
### Features
* **Dynamic Request Generation**: Based on the configuration, K6 will dynamically generate requests to the appropriate API endpoints.
* **Schema Validation**: API responses are validated using custom JSON schemas (AJV schema validation).

* **Dockerized Environment**: The project is fully containerized with Docker for easy deployment and execution.
* **Load Testing**: Supports various load testing strategies using K6's built-in capabilities.

### Getting Started
#### Prerequisites
To get started with this project, you'll need to have the following installed:
* **Docker**: For building and running the testing container
    * [Download Docker](https://docs.docker.com/get-started/get-docker/)
* **K6**: While K6 is included in the Docker container, it's also useful to have it installed locally if you'd like to run the tests directly on your machine.
    * [Install K6](https://grafana.com/docs/k6/latest/set-up/install-k6/)

#### Setup Instructions
1. Clone the Repository
First, clone this repository to your local machine:
~~~
git clone https://github.com/Kasrastar/loadtest_k6
~~~

2. Configure Your API Settings
Edit the config/config.json file to specify your API details such as domain, protocol, and the API endpoints you want to test.

3. Customize Schema Validation
Customize the schema validation for each API response. The schemaValidation function validates responses according to predefined JSON schemas for each API.


### Running the Test

#### without Docker
if K6 is already installed on your system just run following command:

```
K6 run scrips\main.js
``` 

#### Using Docker
1. Build the Docker image
Build the Docker image with the following command:
```
docker build -t k6-load-test .
```

for your own custom __config.json__ file use below command to mount volume:
```
docker run -v path/to/custom_config.json:/loadtest_k6/config/config.json image_id
```

2. Run the load test
After the image is built, run the container with:
```
docker run --rm k6-load-test > results.txt
```

### Project Structure 
Here's a breakdown of the project structure:
```
my-k6-load-test/
│
├── scripts/               # Contains K6 test scripts
│   └── main.js            # The main load testing script
├── utils/                 # Contains utility scripts for generating requests
│   └── apiUtils.js        # Utility functions (e.g., URL and request generators)
├── config/                # Contains configuration files
│   └── config.json        # API configuration settings
├── Dockerfile             # Docker configuration to run the tests
└── package.json           # Project dependencies (including AJV for schema validation)
```

### Contributing
If you'd like to improve the project, please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with a description of your changes