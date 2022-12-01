import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"

export const inputValidatorsMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    response.status(400).json({ errors: errors.array() })
  } else {
    next()
  }
}
export const nameIsReuared = body("name").trim().isLength({ min: 1 }).withMessage("Name is requared")
export const nameIsInvalid = body("name").trim().isLength({ min: 3 }).withMessage("Name shoud be more 3 symbols")
