import React, { useContext } from "react";
import RoomContext from "../RoomContext";

export const JoinButton: React.FC = () => {
  const { ws } = useContext(RoomContext);
  
  const JoinRoom = () => {
    // Pass a value or empty object if you want to send some data
    ws.emit("join-room", {});
    console.log("Joining room"); // Better logging
  }
  const CreateRoom=()=>{
    ws.emit("create-room")
  }

  return (
    <div className="flex justify-between justify-items-center w-[800px]">

<button 
      onClick={JoinRoom} 
      className='bg-rose-400 w-80 px-8 py-2 text-white rounded-lg text-xl hover:bg-rose-600'
    >
      Join Room
    </button>
    <button 
      onClick={CreateRoom} 
      className='bg-blue-400 w-80 px-8 py-2 text-white rounded-lg text-xl hover:bg-blue-600'
    >
      Create Room
    </button>
    </div>
    


  )
}