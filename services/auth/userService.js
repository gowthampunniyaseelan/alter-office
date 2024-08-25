const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../../repositories/auth/userRepository");

const register = async (username, email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = await userRepository.createUser({ username, email, password: hashedPassword });
  
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
  return { id: user._id, username: user.username, email: user.email, accessToken: token };
};

const login = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) throw new Error("Invalid Password!");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
  return { id: user._id, username: user.username, email: user.email, accessToken: token };
};

module.exports = { register, login };
