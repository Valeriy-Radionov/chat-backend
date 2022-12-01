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
exports.runDb = exports.messsagesCollection = exports.usersCollection = exports.usersDb = exports.client = exports.mongoUri = void 0;
const mongodb_1 = require("mongodb");
const socket_io_1 = require("socket.io");
exports.mongoUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017";
exports.client = new mongodb_1.MongoClient(exports.mongoUri);
exports.usersDb = exports.client.db("users-chat");
exports.usersCollection = exports.usersDb.collection("users");
exports.messsagesCollection = exports.usersDb.collection("messages");
const io = new socket_io_1.Server();
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield exports.usersDb.command({ ping: 1 });
            // io.adapter(createAdapter(messsagesCollection))
            // io.listen(3000)
            console.log("Connect seccessfully to database MONGO ");
        }
        catch (_a) {
            console.log("Can't connect to database MONGO");
            yield exports.client.close();
        }
    });
}
exports.runDb = runDb;
