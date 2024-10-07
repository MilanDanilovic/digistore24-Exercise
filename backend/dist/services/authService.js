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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtUtils_1 = require("../utils/jwtUtils");
const users = [];
const register = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    users.push({ username, password: hashedPassword });
    return { username };
});
exports.register = register;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = users.find((u) => u.username === username);
    if (!user)
        throw new Error("User not found");
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new Error("Invalid credentials");
    return (0, jwtUtils_1.signToken)(user.username);
});
exports.login = login;
