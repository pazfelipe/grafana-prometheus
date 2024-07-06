const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {
  register,
  httpRequestDurationMicroseconds,
  httpRequestCounter,
  errorCounter
} = require('./promClient');

const logger = require('./logger');
const route = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('combined', {
  stream: {write: (message) => logger.info(message.trim())}
}));

app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    const labels = {method: req.method, route: req.route ? req.route.path : 'unknown', status_code: res.statusCode};
    end(labels);
    httpRequestCounter.inc(labels);
  });
  next();
});


app.use(route);

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

app.use((err, req, res, next) => {
  errorCounter.inc({error_type: err.name});
  logger.error(err.message, {stack: err.stack});
  res.status(500).send({error: 'Something went wrong!'});
});

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`NodeJS application running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  errorCounter.inc({ error_type: 'unhandledRejection' });
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  errorCounter.inc({ error_type: 'uncaughtException' });
  logger.error('Uncaught Exception:', error);
});