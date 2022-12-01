"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameIsInvalid = exports.nameIsReuared = exports.inputValidatorsMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidatorsMiddleware = (request, response, next) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.inputValidatorsMiddleware = inputValidatorsMiddleware;
exports.nameIsReuared = (0, express_validator_1.body)("name").trim().isLength({ min: 1 }).withMessage("Name is requared");
exports.nameIsInvalid = (0, express_validator_1.body)("name").trim().isLength({ min: 3 }).withMessage("Name shoud be more 3 symbols");
