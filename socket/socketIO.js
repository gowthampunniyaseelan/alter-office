const socketIo = require("socket.io");

let io;

const initSocket = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Listen for join events to add the user to a specific room
    socket.on("join", (userId) => {
      socket.join(userId); // Join a room named after the userId
      console.log(`User ${userId} joined their personal room`);
    });

    // Listen for group join events
    socket.on("joinGroup", (groupId) => {
      socket.join(groupId); // Join a room named after the groupId
      console.log(`User joined group ${groupId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

const sendToUser = (receiverId, message, event) => {
  if (io) {
    io.to(receiverId).emit(event, message); // Emit to the specific user
  }
};

const sendToGroup = (groupId, message, event) => {
  if (io) {
    io.to(groupId).emit(event, message); // Emit to the specific group
  }
};

module.exports = { initSocket, sendToUser, sendToGroup };
