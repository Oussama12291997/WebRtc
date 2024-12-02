import { Socket } from "socket.io";

export const roomHandler=(socket:Socket)=>{
    socket.on("join-room", (data) => {
        console.log("User joined the room:", socket.id)
        console.log("Data received:", data)
      })
    
}