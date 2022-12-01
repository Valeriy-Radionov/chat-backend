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
exports.getAllUsers = void 0;
const usersDatabase_1 = require("../common/database/usersDatabase");
const getAllUsers = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield usersDatabase_1.usersCollection.find({}).toArray();
        if (users) {
            return response.status(201).send(users);
        }
        else {
            return response.status(400).send({ msg: "Failed to get user data", statusCode: 400 });
        }
    }
    catch (e) {
        next(e);
        return response.status(400).send({ msg: "Failed to get user data", statusCode: 400 });
    }
});
exports.getAllUsers = getAllUsers;
