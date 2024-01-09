import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { 
    cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

io.on("connection", (socket) => {
  console.log(socket)
});

httpServer.listen(5000, ()=>{
console.log(`Socket io is listening on port: 5000`)
});