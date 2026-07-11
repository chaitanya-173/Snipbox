import { body, param } from "express-validator";

export const snippetBodyValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("type").isIn(["code", "notes"]).withMessage("Type must be 'code' or 'notes'"),
  body("language").trim().notEmpty().withMessage("Language is required"),
  body("code").notEmpty().withMessage("Content can't be empty"),
];

export const idParamValidator = [param("id").isUUID().withMessage("Invalid snippet id")];