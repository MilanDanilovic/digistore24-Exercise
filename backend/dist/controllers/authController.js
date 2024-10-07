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
exports.refreshAccessToken = exports.loginUser = exports.registerUser = void 0;
const authService_1 = require("../services/authService");
const jwtUtils_1 = require("../utils/jwtUtils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const { accessToken, refreshToken } = yield (0, authService_1.register)(username, password);
        res.status(201).json({ username, accessToken, refreshToken });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const { accessToken, refreshToken } = yield (0, authService_1.login)(username, password);
        res.status(200).json({ accessToken, refreshToken });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    try {
        const decoded = (0, jwtUtils_1.verifyRefreshToken)(refreshToken);
        const newAccessToken = (0, jwtUtils_1.signAccessToken)(decoded.user);
        res.status(200).json({ accessToken: newAccessToken });
    }
    catch (error) {
        res.status(400).json({ error: "Invalid refresh token" });
    }
});
exports.refreshAccessToken = refreshAccessToken;
