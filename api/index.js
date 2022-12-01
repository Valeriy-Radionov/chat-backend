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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const usersDatabase_1 = require("./common/database/usersDatabase");
const authRoutes_1 = require("./routes/authRoutes");
const messagesRoutes_1 = require("./routes/messagesRoutes");
const usersRoutes_1 = require("./routes/usersRoutes");
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const parser = express_1.default.json();
app.use((0, cors_1.default)());
app.use(parser);
app.use("/auth", authRoutes_1.authRouter);
app.use("/messages", messagesRoutes_1.messagesRouter);
app.use("/users", usersRoutes_1.usersRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, usersDatabase_1.runDb)();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = app;
startApp();