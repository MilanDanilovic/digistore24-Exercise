import { eventBus } from "../utils/pluginLoader";
import { createMessage } from "../services/messageService";

// Chatbot responses for different user messages
const chatbotResponses: { [key: string]: string } = {
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
const handleChatbotMessage = (message: string, user: string) => {
  const lowerCaseMessage = message.toLowerCase();

  if (chatbotResponses[lowerCaseMessage]) {
    const botResponse = chatbotResponses[lowerCaseMessage];
    createMessage(botResponse, "Chatbot"); // Bot response as a new message
  }
};

// Initialize the chatbot plugin
export const init = () => {
  console.log("Chatbot plugin initialized.");

  // Listen for message creation event and respond if necessary
  eventBus.on("messageCreated", (message: string, user: string) => {
    if (user !== "Chatbot") {
      handleChatbotMessage(message, user);
    }
  });
};
