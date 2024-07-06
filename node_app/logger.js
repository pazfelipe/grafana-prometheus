const path = require('path');
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf, errors} = format;

const logFormat = printf(({level, message, label, timestamp, stack}) => {
  return `\n\n ${timestamp} [${label}] ${level}: ${stack || message}`;
});


const logger = createLogger({
  level: 'info',
  format: combine(
    label({label: 'NodeJS App'}),
    timestamp(),
    errors({stack: true}),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: path.join(__dirname, 'logs', 'combined.log')}),
    new transports.File({filename: path.join(__dirname, 'logs', 'error.log'), level: 'error'}),
  ],
  exceptionHandlers: [
    new transports.File({filename: path.join(__dirname, 'logs', 'exceptions.log')})
  ]
});

module.exports = logger;