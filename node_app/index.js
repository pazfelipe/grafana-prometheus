const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const logger = require('./logger');
const route = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('combined', {
  stream: {write: (message) => logger.info(message.trim())}
}));


app.use(route);

app.use((err, req, res, next) => {
  logger.error(err.message, {stack: err.stack});
  res.status(500).send({error: 'Something went wrong!'});
});

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`NodeJS application running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});