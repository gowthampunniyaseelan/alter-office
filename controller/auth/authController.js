const userService = require("../../services/auth/userService");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userService.register(username, email, password);
    res.status(201).send({ message: "User registered successfully", ...user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
