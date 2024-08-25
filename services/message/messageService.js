const messageRepository = require("../../repositories/message/messageRepository");

const sendMessage = async (senderId, receiverId, content) => {
  const messageData = { senderId, receiverId, content };
  return await messageRepository.saveMessage(messageData);
};

const getMessageHistory = async (userId, withUserId, groupId, page, pageSize) => {
  let query = { senderId: userId }; // Always include senderId

  if (groupId) {
    query.groupId = groupId; // If groupId is provided, add it to the query
  } else if (withUserId) {
    query.$or = [
      { senderId: userId, receiverId: withUserId },
      { senderId: withUserId, receiverId: userId },
    ]; // If withUserId is provided, include both sender and receiver combinations
  }

  return await messageRepository.getMessages(query, page, pageSize);
};

module.exports = {
  sendMessage,
  getMessageHistory,
};
