const User = require("../../model/auth/userModel");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

module.exports = { findUserByEmail, createUser };
