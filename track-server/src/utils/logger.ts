import winston from "winston";
const { combine, timestamp, colorize, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const options: winston.LoggerOptions = {
  format: combine(colorize(), timestamp(), myFormat),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
    }),
    //new winston.transports.File({ filename: "debug.log", level: "debug" }),
    new winston.transports.File({ filename: "error.log", level: "error" })
  ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
