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
    console.log("-----------------------------------")

    console.log("user created The  room")
    console.log("-----------------------------------")

  }

  const joinRoom=({roomId,peerId}:IRoomParams)=>{
    console.log("-----------------------------------")
    if(rooms[roomId]){
    console.log(`user joined the room:"${roomId} and ${peerId}`)
    console.log("-----------------------------------")
    console.log(rooms)
    rooms[roomId].push(peerId)
    socket.join(roomId)
    socket.emit("get-users",{
      roomId,
      participants:rooms[roomId]
    })
    
  }else console.log("no room found")
  }
  socket.on("create-room",createRoom)
  socket.on("join-room",joinRoom)

}