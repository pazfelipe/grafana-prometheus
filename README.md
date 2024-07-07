# Monitoring a NodeJs application with Prometheus, Loki and Grafana

## Description

This project demonstrates the integration of a Node.js application with Loki and Promtail for log aggregation and monitoring. The application logs are collected and sent to Loki via Promtail, allowing centralized log management and visualization using Grafana.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Docker and Docker Compose installed
- Node.js and npm installed
- Basic understanding of Docker and containerization

## Installation

Follow these steps to set up the project:

1. Clone the repository:

```sh
   git clone https://github.com/pazfelipe/grafana-prometheus.git
   cd grafana-prometheus
   docker-compose up --build -d
```

## Configuration

1. **Promtail Configuration**:
   - Ensure you have the correct configuration file (`promtail-config.yml`) in the root directory.
   - The configuration file should be mounted to the Promtail container in `docker-compose.yml`.

2. **Loki Configuration**:
   - Ensure you have the correct configuration file (`loki-config.yml`) in the root directory.
   - The configuration file should be mounted to the Loki container in `docker-compose.yml`.

3. **Grafana Configuration**:
   - Grafana is configured to use a persistent volume to store its data. Ensure the volume is correctly set up in `docker-compose.yml`.
   - After starting the containers, access Grafana at `http://localhost:3000` and configure Loki as a data source.
  
## How to Use

1. **Starting the Application**:
   - After setting up and starting the Docker containers, the Node.js application will be running on `http://localhost:3001`.

2. **Accessing Grafana**:
   - Open your browser and go to `http://localhost:3000`.
   - Log in with the default credentials (`admin` / `admin`) and configure Loki as a data source to visualize logs.

3. **Node.js Application Routes**:
   - The application provides several routes to test logging and error handling:
     - `GET /`: Returns a successful connection message (status 200).
     - `GET /invalid-request`: Simulates a bad request (status 400).
     - `GET /not-authorized`: Simulates a not authorized request (status 401).
     - `GET /not-authenticated`: Simulates a forbidden request (status 403).
     - `GET /internal-error`: Simulates an internal server error (status 500).
     - `GET /server-error`: Simulates a service unavailable error (status 503).
     - `GET /failing`: Simulates an unhandled error by accessing an undefined variable.
     - `GET /failing-2`: Simulates another unhandled error by attempting to reassign a constant.

## Examples

Here are some examples of how to interact with the Node.js application and visualize the logs in Grafana:

1. **Accessing the Home Route**:
   - Open your browser and go to `http://localhost:3001/`.
   - You should see a message indicating a successful connection.

2. **Triggering Different Status Codes**:
   - Visit the following routes to trigger different HTTP status codes:
     - `http://localhost:3001/invalid-request` (400 Bad Request)
     - `http://localhost:3001/not-authorized` (401 Unauthorized)
     - `http://localhost:3001/not-authenticated` (403 Forbidden)
     - `http://localhost:3001/internal-error` (500 Internal Server Error)
     - `http://localhost:3001/server-error` (503 Service Unavailable)
     - `http://localhost:3001/failing` (Unhandled Error: ReferenceError)
     - `http://localhost:3001/failing-2` (Unhandled Error: TypeError)

3. **Viewing Logs in Grafana**:
   - Open Grafana at `http://localhost:3000` and log in with `admin` / `admin`.
   - Go to the "Explore" section, select Loki as the data source, and use queries to filter logs.
   - Example queries:
     - `{job="nodejs_app"} | json`
     - `{job="nodejs_app", error_type="ReferenceError"}`

## Project Structure

The project directory structure is as follows:

```sh
.
├── README.md
├── docker-compose.yaml
├── loki-config.yaml
├── node_app
│   ├── Dockerfile
│   ├── index.js
│   ├── logger.js
│   ├── logs
│   │   ├── combined.log
│   │   ├── error.log
│   │   └── exceptions.log
│   ├── package.json
│   ├── promClient.js
│   ├── routes.js
│   └── yarn.lock
├── prometheus.yaml
└── promtail-config.yaml
```

## Technologies Used

The project leverages the following technologies:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine for building fast and scalable network applications.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Docker**: A platform for developing, shipping, and running applications in containers, which enables fast, consistent delivery of your applications.
- **Docker Compose**: A tool for defining and running multi-container Docker applications. It allows you to define the services, networks, and volumes your application needs.
- **Prometheus**: An open-source systems monitoring and alerting toolkit designed for reliability and scalability.
- **Loki**: A log aggregation system designed to store and query logs from applications and infrastructure.
- **Promtail**: An agent that ships the contents of local logs to a private Loki instance or Grafana Cloud.
- **Grafana**: An open-source platform for monitoring and observability, providing dashboards and visualizations for your data.
- **Winston**: A versatile logging library for Node.js applications.
