const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
  },
});
const roomHosts = {};
io.on('connection', socket => {

  socket.on('getMyId', () => {
    socket.emit('yourId', socket.id);
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    const others = Array.from(io.sockets.adapter.rooms.get(roomId) || []).filter(id => id !== socket.id);
    if (others.length > 0) {
      socket.to(others[0]).emit('userJoined', socket.id);
    }
    // Assign host if room is empty
    if (!roomHosts[roomId]) {
      roomHosts[roomId] = socket.id;
      console.log(`Host assigned for room ${roomId}: ${socket.id}`);
    }

    // Broadcast the current host to all in room
    io.to(roomId).emit('hostAssigned', roomHosts[roomId]);

    // Notify others about new user
    socket.to(roomId).emit('userJoined', socket.id);
  });

  socket.on('sendSignal', ({ userToSignal, signal }) => {
    io.to(userToSignal).emit('receiveSignal', { signal, from: socket.id });
  });

  socket.on('returnSignal', ({ signal, to }) => {
    io.to(to).emit('returnedSignal', { signal, from: socket.id });
  });
// socket.on("sendMessage", ({ roomId, message }) => {
//   console.log("Relaying message:", message); // ✅ Add log
//   socket.to(roomId).emit("receiveMessage", message);
// });
socket.on("sendMessage", ({ roomId, message, sender }) => {
  // Relay as { sender, text }
  socket.to(roomId).emit("receiveMessage", { sender, text: message });
});
  // socket.on('disconnect', () => {
  //   console.log('user disconnected', socket.id);
  // });

 socket.on('endMeeting', (roomId) => {
    // Only allow host to end meeting
    if (roomHosts[roomId] === socket.id) {
      io.to(roomId).emit('meetingEnded');
      io.socketsLeave(roomId);
      delete roomHosts[roomId];
      console.log(`Meeting ended by host ${socket.id} in room ${roomId}`);
    } else {
      console.log(`Non-host ${socket.id} tried to end meeting in room ${roomId}`);
    }
  });
   socket.on('disconnecting', () => {
    // Check if socket is host of any room
    const rooms = [...socket.rooms].filter(r => r !== socket.id);
    rooms.forEach(roomId => {
      if (roomHosts[roomId] === socket.id) {
        io.to(roomId).emit('meetingEnded');
        delete roomHosts[roomId];
        console.log(`Host ${socket.id} disconnected, meeting ended in room ${roomId}`);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



// // Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


// // Config
dotenv.config({ path: "config/config.env" });


// // Connecting to database
connectDatabase();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start server here
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle uncaught exceptions and unhandled rejections as you already do
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
