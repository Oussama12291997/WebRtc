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
    rooms[roomId].push(peerId)
    socket.join(roomId)
    socket.to(roomId).emit("user-joined",{peerId})
    socket.emit("get-users",{
      roomId,
      participants:rooms[roomId]
    })

  }else console.log("no rooms found")



  socket.on("disconnect", () => {
    console.log("user left the room" , peerId)
    console.log("-----------------------------------")
  leaveRoom({roomId,peerId})
  })










  }
  const leaveRoom=({roomId,peerId}:IRoomParams)=>{
    rooms[roomId]=rooms[roomId].filter((id)=>id!==peerId)
    socket.to(roomId).emit("user-disconnected",peerId)
  }


  const startSharing=({peerId,roomId}: IRoomParams)=>{
    socket.to(roomId).emit("user-started-sharing",peerId)
  }

  const stopSharing=(roomId:string)=>{
      socket.to(roomId).emit("user-Stopped-Sharing")
  }

  socket.on("create-room",createRoom)
  socket.on("join-room",joinRoom)
  socket.on("start-sharing",startSharing)
  socket.on("stop-sharing",stopSharing)

}