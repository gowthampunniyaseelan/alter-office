const Group = require("../../model/group/groupModel");
const Message = require("../../model/message/messageModel");

const createGroup = async (name, members) => {
  const group = new Group({ name, members });
  return await group.save();
};

const findGroupById = async (groupId) => {
  return await Group.findById(groupId);
};

const saveMessage = async (message) => {
  return await message.save();
};

const getMessagesByGroupId = async (groupId, page, pageSize) => {
  return await Message.find({ groupId })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
};

module.exports = {
  createGroup,
  findGroupById,
  saveMessage,
  getMessagesByGroupId,
};
