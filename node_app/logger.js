const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf, errors} = format;

const logFormat = printf(({level, message, label, timestamp, stack}) => {
  return `${timestamp} [${label}] ${level}: ${stack || message}`;
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
    new transports.File({filename: 'combined.log'}),
    new transports.File({filename: 'error.log', level: 'error'})
  ],
  exceptionHandlers: [
    new transports.File({filename: 'exceptions.log'})
  ]
});

module.exports = logger;