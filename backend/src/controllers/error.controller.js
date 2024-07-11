import { verifyAccessToken } from "../utils/jwt.js";
import { logger } from "../utils/winston.js";

// eslint-disable-next-line no-unused-vars
export const errorHandling = (err, req, res, next) => {
  const message = err.message.split(" - ")[1];
  logger.error(err);
  return res.status(500).json({
    error: message,
    message: "Internal server error",
    data: null,
  });
};

export const notFound = (req, res) => {
  res.status(404).json({
    error: "Page Not Found",
    message: "field",
    data: null,
  });
};

export const autenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({
      errors: "No token provided",
      message: "verify token field",
      data: null,
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      errors: "No token provided",
      message: "verify token field",
      data: null,
    });
  }
  const user = verifyAccessToken(token);
  if (!user) {
    return res.status(401).json({
      errors: "Invalid token",
      message: "verify token field",
      data: null,
    });
  }
  re.user = user;
  next();
};
