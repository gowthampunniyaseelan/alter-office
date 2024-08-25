const groupService = require("../../services/group/groupService");
const socket = require("../../socket/socketIO");

const createGroup = async (req, res) => {
  const { name, members } = req.body;
  try {
    const group = await groupService.createGroup(name, members);
    res.status(201).send(group);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const sendGroupMessage = async (req, res) => {
  const { groupId } = req.params;
  const { senderId, content } = req.body;

  try {
    const message = await groupService.sendGroupMessage(groupId, senderId, content);
    
    // Emit the message to the group
    socket.sendToGroup(groupId, message, "receiveGroupMessage");
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const messages = await groupService.getGroupMessages(groupId, page, pageSize);
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createGroup,
  sendGroupMessage,
  getGroupMessages,
};
