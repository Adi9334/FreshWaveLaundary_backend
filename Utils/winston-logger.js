
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Define a custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                colorize(), // Add colors to the console output
                logFormat
            )
        }),
        new transports.File({ filename: 'logs/app.log' })
    ]
});

module.exports = logger;
