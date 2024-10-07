"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.getMessages = void 0;
const pluginLoader_1 = require("../utils/pluginLoader");
const messages = [];
const getMessages = () => {
    return messages;
};
exports.getMessages = getMessages;
const createMessage = (message, user) => {
    const newMessage = { message, user, timestamp: new Date() };
    messages.push(newMessage);
    // Emit event when a message is created
    pluginLoader_1.eventBus.emit("messageCreated", message, user);
    return newMessage;
};
exports.createMessage = createMessage;
