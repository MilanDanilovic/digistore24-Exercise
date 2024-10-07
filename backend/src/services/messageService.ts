const messages: { message: string; user: string; timestamp: Date }[] = [];

export const getMessages = () => {
  return messages;
};

export const createMessage = (message: string, user: string) => {
  const newMessage = { message, user, timestamp: new Date() };
  messages.push(newMessage);
  return newMessage;
};
