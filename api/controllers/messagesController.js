"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = exports.getAllMessages = void 0;
const usersDatabase_1 = require("../common/database/usersDatabase");
const getAllMessages = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.senderId;
        const user = yield usersDatabase_1.usersCollection.findOne({ id: id });
        if (user === null || user === void 0 ? void 0 : user.userName) {
            const messages = yield usersDatabase_1.messsagesCollection.find({ destination: user.userName }).toArray();
            if (messages.length > 0) {
                return response.status(201).send(messages);
            }
            else {
                return response.status(201).send({ msg: "You don't have messages" });
            }
        }
    }
    catch (e) {
        next(e);
    }
});
exports.getAllMessages = getAllMessages;
const addMessage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { destination, textMessage, themeMessage, senderId } = request.body;
        if (destination && textMessage && themeMessage && senderId) {
            console.log(destination);
            const user = yield usersDatabase_1.usersCollection.findOne({ id: senderId });
            const date = new Date().toLocaleString();
            if (user) {
                const responseData = yield usersDatabase_1.messsagesCollection.insertOne({ destination, textMessage, themeMessage, date: date, senderId, sender: user === null || user === void 0 ? void 0 : user.userName });
                responseData && response.status(201).send({ msg: "Message sent successfully!", statusCode: 201 });
            }
        }
        else {
            response.status(400).send({ msg: "Message was not sent!", statusCode: 400 });
        }
    }
    catch (e) {
        response.status(400).send({ msg: `Error - ${e}`, statusCode: 400 });
    }
});
exports.addMessage = addMessage;
