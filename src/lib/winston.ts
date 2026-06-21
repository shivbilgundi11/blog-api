// Node modules
import winston from 'winston';

// Custom modules
import config from '@/config/index';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

// Define the transparent array to hold different logging transposts
const transports: winston.transport[] = [];

// If the application is not running in production, add a console transport
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // Add color to the log level
        timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }), // Add timestamp to the log
        align(), // Align the log messages
        printf(({ timestamp, level, message, ...metadata }) => {
          const msgStr = Object.keys(metadata).length
            ? `\n${JSON.stringify(metadata)}`
            : '';

          return `${timestamp} [${level}]: ${message}${msgStr}`;
        }),
      ),
    }),
  );
}

// create a logger instance with the defined transports and format
const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info', // Set the log level from config or default to 'info'
  format: combine(timestamp(), errors({ stack: true }), json()), // use json format for logs and include stack trace for errors
  transports, // use the defined transports
  silent: config.NODE_ENV === 'test', // disable logs in test environment
});

export { logger };
