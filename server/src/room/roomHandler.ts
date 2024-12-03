import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms:Record<string,string[]>={}
interface IRoomParams{
  roomId:string,
  peerId:string
}
export const roomHandler=(socket:Socket)=>{

  const createRoom=()=>{
    const roomId=uuidV4()
    rooms[roomId]=[]
    socket.emit("room-created",{roomId})
    console.log("user created The  room")
  }

  const joinRoom=({roomId,peerId}:IRoomParams)=>{
    console.log("new user joined the room:",roomId, peerId) 
    socket.join(roomId)
  }

  socket.on("create-room",createRoom)
  socket.on("join-room",joinRoom)

}