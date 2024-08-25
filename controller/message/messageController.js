const messageService = require("../../services/message/messageService");
const socket = require("../../socket/socketIO");

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    // Create and save the message
    const message = await messageService.sendMessage(senderId, receiverId, content);
    
    // Emit the message to the receiver's socket
    socket.sendToUser(receiverId, message, "receiveMessage");
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getMessageHistory = async (req, res) => {
  const { userId } = req.query;
  const withUserId = req.query.withUserId; // Optional
  const groupId = req.query.groupId; // Optional
  const page = parseInt(req.query.page) || 1; // Default to 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 if not provided

  // Check if userId is provided
  if (!userId) {
    return res.status(400).send({ message: "userId is required" });
  }

  try {
    // Retrieve messages with pagination
    const messages = await messageService.getMessageHistory(userId, withUserId, groupId, page, pageSize);
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
