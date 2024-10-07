"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.getMessages = void 0;
const messages = [];
const getMessages = () => {
    return messages;
};
exports.getMessages = getMessages;
const createMessage = (message, user) => {
    const newMessage = { message, user, timestamp: new Date() };
    messages.push(newMessage);
    return newMessage;
};
exports.createMessage = createMessage;
