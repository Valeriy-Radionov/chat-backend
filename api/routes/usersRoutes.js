"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.get("/all", usersController_1.getAllUsers);
