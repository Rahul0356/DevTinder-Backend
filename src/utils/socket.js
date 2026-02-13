const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChat", ({ userId, targetUserId }) => {
      // Create a consistent room ID regardless of who initiates
      const room = [userId, targetUserId].sort().join("-");
      socket.join(room);
      console.log(`User ${userId} joined room: ${room}`);
    });

    socket.on("sendMessage", ({ firstName, lastName, userId, targetUserId, text }) => {
      // Create the same room ID
      const room = [userId, targetUserId].sort().join("-");
      
      // Emit to everyone in the room (including sender for confirmation)
      io.to(room).emit("messageReceived", {
        firstName,
        lastName,
        text
      });
      
      console.log(`Message sent in room ${room}:`, text);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;