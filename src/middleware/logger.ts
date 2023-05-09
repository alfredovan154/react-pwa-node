import winston from "winston";
import { Request, Response, NextFunction, response } from "express";
const { combine, timestamp, printf, colorize, align } = winston.format;


const myFormat = printf(({ level, message, timestamp}) => {
  return `${timestamp} [${level}] ${message}`;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    colorize({colors: {info: 'blue'}}),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});

export const loggerMiddleware = (request: Request, response: Response, next: NextFunction) => {
  logger.info(response.statusCode);
  next();
};
