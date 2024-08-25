const Message = require("../../model/message/messageModel");

// Save a new message to the database
const saveMessage = async (messageData) => {
  const message = new Message(messageData);
  return await message.save();
};

// Retrieve messages based on the provided query
const getMessages = async (query, page, pageSize) => {
  return await Message.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
};

module.exports = {
  saveMessage,
  getMessages,
};
