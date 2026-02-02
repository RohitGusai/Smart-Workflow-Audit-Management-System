const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const app = express();
const cors = require("cors");

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
    },
});

app.use(cors());
app.use(express.json());




io.on('connection',(socket)=>{
    console.log("A user Id",socket.id);
    
    socket.on("join",(userId)=>
    {
        if(!userId) return;
        socket.join(userId.toString());
        console.log(`User Joined Room: ${userId}`);


    });

    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
    });
});




app.post('/emit-Notifications',(req,res)=>
{
    console.log("Notification Request Body:", req.body);
    const {userId,notification} = req.body;
    const roomSize = io.sockets.adapter.rooms.get(userId.toString())?.size || 0;
    console.log(`Targeting User: ${userId} | Active connections in room: ${roomSize}`);

    if (roomSize === 0) {
        console.warn(`⚠️ Warning: No active UI sessions found for User ${userId}. The notification will be saved in DB but not seen live.`);
    }

    io.to(userId.toString()).emit("notification", notification);
    res.status(200).send("Notification Sent");
     if (!userId) {
        console.log("userId is missing in the request body");
        return res.status(400).json({ error: "userId missing" });
    }

    io.to(userId.toString()).emit("notification",notification);
    res.status(200).send("Notification Sent");
    console.log(`Notification sent to user ${userId}:`, notification);
});

server.listen(4000, () => {
  console.log("Socket server running on port 4000");
});