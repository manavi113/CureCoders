const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require("./config/db");
const drRoute =require("./Routes/doctorRoutes");
 
const geminiRoute = require('./Routes/geminiRoutes');
 
const app = express();
 
connectDB();
app.use(cors());
app.use(express.json());

 

app.use('/api/gemini', geminiRoute);
app.use("/api/doctors",drRoute);
 
const Port = 3000;
app.listen(Port, ()=>{
    console.log(`Server is running at the port ${Port}`);
})