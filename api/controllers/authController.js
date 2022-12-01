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
exports.logout = exports.me = exports.auth = void 0;
const nanoid_1 = require("nanoid");
const usersDatabase_1 = require("../common/database/usersDatabase");
const auth = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = request.body.name;
        const userCheck = yield usersDatabase_1.usersCollection.findOne({ userName: userName });
        if (userCheck) {
            return response.status(201).json({ id: userCheck.id, userName: userCheck.userName, token: userCheck.token });
        }
        else {
            const id = (0, nanoid_1.nanoid)();
            const user = yield usersDatabase_1.usersCollection.insertOne({ id: id, userName: userName, token: id });
            return user && response.status(201).json({ id, userName, token: id });
        }
    }
    catch (e) {
        next(e);
        return response.status(400).json({ msg: "Request Failure!", status: false, token: "" });
    }
});
exports.auth = auth;
const me = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.params.token;
        if (token) {
            const isToken = yield usersDatabase_1.usersCollection.findOne({ token: token });
            if (isToken) {
                return response.status(201).json({ msg: "User autorized", isAuth: true });
            }
        }
        else {
            return response.status(401).send({ msg: "You are not autorized", isAuth: false });
        }
    }
    catch (e) {
        next(e);
        return response.status(401).json({ msg: "Failure", isAuth: false });
    }
});
exports.me = me;
const logout = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.params.token;
        if (token) {
            yield usersDatabase_1.usersCollection.findOneAndUpdate({ token: token }, { $set: { isAuth: false } });
            return response.status(201).json({ msg: "User logout!", status: true, token: "" });
        }
        else {
            return response.status(401).json({ msg: "Failure", status: false, token: "" });
        }
    }
    catch (e) {
        next(e);
    }
});
exports.logout = logout;
