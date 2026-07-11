import { validationResult } from "express-validator";

// Runs after any *Validator array — collects express-validator's results
// and short-circuits with a 400 if anything failed.
export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
}