const groupRepository = require("../../repositories/group/groupRepository");
const Message = require("../../model/message/messageModel");

const createGroup = async (name, members) => {
  return await groupRepository.createGroup(name, members);
};

const sendGroupMessage = async (groupId, senderId, content) => {
  const message = new Message({ senderId, groupId, content });
  await groupRepository.saveMessage(message);
  return message;
};

const getGroupMessages = async (groupId, page, pageSize) => {
  return await groupRepository.getMessagesByGroupId(groupId, page, pageSize);
};

module.exports = {
  createGroup,
  sendGroupMessage,
  getGroupMessages,
};
