"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const pluginLoader_1 = require("../utils/pluginLoader");
const messageService_1 = require("../services/messageService");
// Chatbot responses for different user messages
const chatbotResponses = {
    hello: "Hello! How can I help you?",
    bye: "Goodbye!",
    help: "I am here to assist you. Ask me anything!",
    bot: "Yes, I am a bot. How can I help you?",
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    weather: "The weather is sunny today.",
    news: "Here are the latest news headlines...",
    music: "Playing your favorite music...",
    movie: "Here are the top movies to watch...",
    joke: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    quote: "The best way to predict the future is to invent it.",
    thanks: "You're welcome!",
    sorry: "No problem!",
    love: "I love you too!",
    hate: "I'm sorry to hear that.",
};
// Chatbot logic to handle user messages and respond accordingly, this is a simple example
const handleChatbotMessage = (message, user) => {
    const lowerCaseMessage = message.toLowerCase();
    if (chatbotResponses[lowerCaseMessage]) {
        const botResponse = chatbotResponses[lowerCaseMessage];
        (0, messageService_1.createMessage)(botResponse, "Chatbot"); // Bot response as a new message
    }
};
// Initialize the chatbot plugin
const init = () => {
    console.log("Chatbot plugin initialized.");
    // Listen for message creation event and respond if necessary
    pluginLoader_1.eventBus.on("messageCreated", (message, user) => {
        if (user !== "Chatbot") {
            handleChatbotMessage(message, user);
        }
    });
};
exports.init = init;
