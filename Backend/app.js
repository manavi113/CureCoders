const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const drRoute =require("./Routes/doctorRoutes");
// const geminiRoute = require('./Routes/geminiRoutes');
 const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

app.use(
  cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    
  // Create socket.io instance and attach it to server
const io = new Server(server, {
  cors: {
origin: "http://localhost:5173",
    methods: ["GET", "POST"],
     transports: ["websocket", "polling"],
  },
});

// Make io accessible in other files like app.js
app.set("io", io);
// Config
dotenv.config({ path: "config/config.env" });


app.use(express.json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
// app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));




const user = require("./Routes/userR");
const payment = require("./Routes/paymentR");
// const order = require("./routes/orderR");
// const product = require("./routes/productR");

const meetingRoutes = require('./Routes/meetingR');
// app.use("/api/v1", product);
app.use("/api/v1", user);
// app.use("/api/v1", order);
app.use("/api/v1", payment);
// app.use('/api/gemini', geminiRoute);
app.use("/api/doctors",drRoute);

app.use('/api/meetings', meetingRoutes);
// // Middleware for Errors
app.use(errorMiddleware);


 
 
require('dotenv').config();
 
const connectDB = require("./config/db");
 
 
 
 
 
 
connectDB();
 
 

 

// app.use('/api/gemini', geminiRoute);
app.use("/api/doctors",drRoute);
 
 
 

module.exports = app;

