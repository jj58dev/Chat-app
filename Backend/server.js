const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const {app,server} = require("./socket/socket.js");
const cors = require('cors');

const connectToMongoDB = require("./db/connectToMongoDB.js");

dotenv.config();

const PORT=process.env.PORT || 3001


const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
  };



app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const ___dirname = path.resolve();

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(___dirname,"/Frontend/dist")));

app.get("*",(req,res) => {
  res.sendFile(path.join(___dirname,"Frontend","dist","index.html"));
});



server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);    
});
