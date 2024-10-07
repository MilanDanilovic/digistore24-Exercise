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
exports.postMessage = exports.fetchMessages = void 0;
const messageService_1 = require("../services/messageService");
const fetchMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = (0, messageService_1.getMessages)();
    res.status(200).json(messages);
});
exports.fetchMessages = fetchMessages;
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, user } = req.body;
    try {
        const newMessage = (0, messageService_1.createMessage)(message, user);
        res.status(201).json(newMessage);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.postMessage = postMessage;
