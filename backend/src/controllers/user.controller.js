import { error } from "winston";
import prisma from "../utils/client.js";
import {
  generateAcessToken,
  generateRefreshToken,
  parseJWT,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { inputUserValidation } from "../validations/user.validation.js";

export const createUser = async (req, res, next) => {
  try {
    const { error, value } = inputUserValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: "field",
        data: null,
      });
    }
    const user = await prisma.user.create({
      data: {
        ...value,
      },
    });
    return res.status(201).json({
      error: null,
      message: "succses",
      data: user,
    });
  } catch (error) {
    next(
      new Error(
        "Error in src/controllers/user.controller.js:create -" + error.message
      )
    );
  }
};

export const getAcessToken = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        uuid: id,
      },
    });
    if (!user) {
      return res.status(404).json({
        error: "data not found",
        message: "failed",
        data: null,
      });
    }
    // generate acess token
    user.uuid = "XXXXXXXXXXXXXXXX";
    const acessToken = generateAcessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res.status(200).json({
      error: null,
      message: "succses",
      acessToken,
      refreshToken,
    });
  } catch (error) {
    next(
      new Error(
        "Error in src/controllers/user.controller.js:getAcessToken -" +
          error.message
      )
    );
  }
};

export const generateRefreshToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        errors: "Invalid token",
        message: "no token privided",
        data: null,
      });
    }
    const verify = verifyRefreshToken(token);
    if (!verify) {
      return res.status(401).json({
        errors: "Invalid token",
        message: "no token privided",
        data: null,
      });
    }
    let data = parseJWT(token);
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!user) {
      return res.status(400).json({
        error: "user not found",
        message: "failed",
        data: null,
      });
    }
    user.uuid = "XXXXXXXXXXXXXXXX";
    const acessToken = generateAcessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res.status(200).json({
      error: null,
      message: "succses",
      data: user,
      acessToken,
      refreshToken,
    });
  } catch (error) {
    next(
      new Error(
        "Error in src/controllers/user.controller.js:getAcessToken -" +
          error.message
      )
    );
  }
};
