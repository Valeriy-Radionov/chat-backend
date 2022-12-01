"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRouter = void 0;
const express_1 = require("express");
const messagesController_1 = require("../controllers/messagesController");
exports.messagesRouter = (0, express_1.Router)({});
exports.messagesRouter.get("/all/:senderId", messagesController_1.getAllMessages);
exports.messagesRouter.post("/message", messagesController_1.addMessage);
